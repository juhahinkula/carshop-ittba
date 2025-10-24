import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { CarForm } from '../types';

type AddCarProps = {
  getCars: () => void;
}

export default function AddCar({ getCars }: AddCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<CarForm>({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: new Date().getFullYear(),
    price: 0
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "POST",
      headers: { "content-type" : "application/json"  },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new car");

      return response.json();
    })
    .then(() => { 
      getCars();
      handleClose(); 
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new Car</DialogTitle>
        <DialogContent>
            <TextField
              value={car.brand}
              onChange={event => setCar({ ...car, brand: event.target.value })}
              margin="dense"
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              value={car.model}
              onChange={event => setCar({ ...car, model: event.target.value })}
              margin="dense"
              label="Model"
              fullWidth
              variant="standard"
            />
            <TextField
              value={car.color}
              onChange={event => setCar({ ...car, color: event.target.value })}
              margin="dense"
              label="Color"
              fullWidth
              variant="standard"
            />
            <TextField
              value={car.fuel}
              onChange={event => setCar({ ...car, fuel: event.target.value })}
              margin="dense"
              label="Fuel"
              fullWidth
              variant="standard"
            />
            <TextField
              value={car.modelYear}
              onChange={event => setCar({ ...car, modelYear: Number(event.target.value) })}
              type="number"
              margin="dense"
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              value={car.price}
              onChange={event => setCar({ ...car, price: Number(event.target.value) })}
              margin="dense"
              type="number"
              label="Price"
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
