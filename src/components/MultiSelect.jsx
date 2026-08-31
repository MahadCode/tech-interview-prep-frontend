// components/MultiSelect.jsx
import React from "react";

function MultiSelect({ options, label, value = [], onChange, className = "" }) {
  const toggleOption = (id) => {
    const idStr = String(id);
    const exists = value.includes(idStr);
    const next = exists
      ? value.filter((v) => v !== idStr)
      : [...value, idStr];
    onChange(next);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg bg-white min-h-[3rem]">
        {options?.length ? (
          options.map((opt) => {
            const idStr = String(opt.id);
            const selected = value.includes(idStr);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleOption(opt.id)}
                className={`px-3 py-1.5 text-sm rounded-full border duration-150 ${
                  selected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {opt.name}
              </button>
            );
          })
        ) : (
          <span className="text-sm text-gray-400">Loading options...</span>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;