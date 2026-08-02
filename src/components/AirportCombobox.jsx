import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Building2 } from 'lucide-react';
import { AIRPORTS } from '../data';

/**
 * Selector de aeropuerto con autocompletado por ciudad, nombre o código OACI.
 * Implementa el patrón combobox: navegación con flechas, Enter para elegir,
 * Escape para cerrar y `aria-activedescendant` para lectores de pantalla.
 */
export default function AirportCombobox({ id, label, value, onChange, placeholder, exclude }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);
  const listId = useId();

  const options = useMemo(() => {
    const pool = AIRPORTS.filter((a) => a.code !== exclude);
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter((a) =>
      [a.city, a.name, a.code].some((f) => f.toLowerCase().includes(q))
    );
  }, [query, exclude]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  useEffect(() => setHighlight(0), [query, open]);

  const select = (airport) => {
    onChange(airport);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      setHighlight((h) => {
        const next = e.key === 'ArrowDown' ? h + 1 : h - 1;
        return (next + options.length) % options.length;
      });
    } else if (e.key === 'Enter') {
      if (open && options[highlight]) {
        e.preventDefault();
        select(options[highlight]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Con el desplegable abierto el input muestra lo que se escribe;
  // cerrado, muestra la selección confirmada.
  const display = open ? query : value ? `${value.city} (${value.code})` : '';

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative flex items-center">
        <Building2 size={15} className="absolute left-0 text-gray-400 pointer-events-none" />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[highlight] ? `${listId}-${highlight}` : undefined}
          autoComplete="off"
          value={display}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent pl-6 pr-2 text-sm font-medium text-ink-900 placeholder-gray-400 outline-none truncate"
        />
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 left-0 right-0 top-full mt-2 max-h-64 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lift"
        >
          {options.length === 0 && (
            <li className="px-3 py-3 text-sm text-gray-400">Sin resultados para “{query}”</li>
          )}
          {options.map((a, i) => (
            <li
              key={a.code}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={value?.code === a.code}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                select(a);
              }}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                i === highlight ? 'bg-cloud-100' : ''
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-ink-900">{a.city}</span>
                <span className="block truncate text-xs text-gray-400">{a.name}</span>
              </span>
              <span className="shrink-0 rounded-md bg-cloud-200 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-gray-500">
                {a.code}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
