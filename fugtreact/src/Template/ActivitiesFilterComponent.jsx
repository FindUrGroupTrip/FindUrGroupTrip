import React from 'react'

function ActivitiesFilterComponent({
  filters,
  onFilterChange,
  onFilterSubmit,
}) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={filters.nom}
          onChange={onFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="lieu"
          placeholder="Lieu"
          value={filters.lieu}
          onChange={onFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={onFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        {onFilterSubmit && (
          <button
            onClick={onFilterSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Filter
          </button>
        )}
      </div>
    </div>
  )
}

export default ActivitiesFilterComponent
