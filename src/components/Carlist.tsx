import { useEffect, useState } from "react";
import type { Car } from "../types";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { fetchCars, deleteCar } from "../carapi";
import Button from "@mui/material/Button";
import AddCar from "./AddCar";

function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", width: 150 },
    { field: "color"},
    { field: "fuel" },
    { field: "modelYear", headerName: "Model Year"},
    { field: "price" },
    {
      field: "_links.self.href",
      headerName: "Actions",
      renderCell: (params: GridRenderCellParams) =>
        <Button 
          color="error" 
          size="small" 
          onClick={() => handleDelete(params.id as string)}
        >
          Delete
        </Button> 
    }
  ]

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    fetchCars()
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure to delete car?")) {
      deleteCar(url)
      .then(() => getCars())
      .catch(err => console.error(err))
    }
  }

  return(
    <>
      <AddCar getCars={getCars} />
      <div style={{ width: '90%', height: 500 }}>
        <DataGrid 
          autoPageSize
          rows={cars}
          columns={columns}
          getRowId={row => row._links.self.href}
        />
      </div>
    </>
  )
}

export default Carlist;