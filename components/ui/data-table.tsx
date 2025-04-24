import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  ModuleRegistry,
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  PaginationModule,
  CellStyleModule,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

// Register AG Grid Modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  PaginationModule,
  CellStyleModule,
])

interface DataTableProps<T> {
  data: T[]
  columns: ColDef<T>[]
  pageSize?: number
}

export function DataTable<T>({ 
  data, 
  columns,
  pageSize = 10 
}: DataTableProps<T>) {
  return (
    <div className="ag-theme-alpine rounded-md w-full">
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true
        }}
        pagination={true}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        domLayout="autoHeight"
        headerHeight={48}
        rowHeight={56}
        suppressCellFocus={true}
        theme="legacy"
      />
    </div>
  )
} 