import { Dialog } from 'primereact/dialog';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useCrud } from '../../../Providers/CRUD';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';

function AddReview({ onHide, visible }) {
  // Contexto CRUD para interactuar con las operaciones CRUD
  const { addReviews } = useCrud();

  // Contexto CRUD para interactuar con las operaciones CRUD
  const toast = useRef(null);

  // Estados para los campos del formulario
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(1);
  const [user, setUser] = useState('');  

  // Crea una review utilizando los datos del formulario
  const create = () => { 
    const newReview = {
      user: user,
      description: description,
      score: score,
      createdAt: new Date()
    }
    // Invoca la función createMovie del contexto CRUD
    addReviews(newReview);
    // Muestra un mensaje de éxito con el componente Toast
    toast.current.show({
      severity: 'info',
      summary: 'Reseña agregada',
      detail: '',
      life: 3000,
    });
    // Oculta el cuadro de diálogo después de la creación
    onHide(false);
  };
  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        header={`Agrega una reseña`}
        pt={{
          headerTitle: { className: 'flex justify-content-center text-4xl' },
        }}
        draggable={false}
        style={{ width: '80vw' }}
        visible={visible}
        onHide={() => onHide(false)}
      >
        <div className='grid p-4'>
          <div className='col-8 col-offset-2'>
            <form>
              <div className='p-fluid'>
                <div className='p-field'>
                  <label htmlFor='title'>Nombre</label>
                  <InputText
                    id='title'
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </div>

                <div className='p-field mt-3'>
                  <label htmlFor='synopsis'>Descripción</label>
                  <InputTextarea
                    id='synopsis'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div> 
                <div className='p-field mt-3'>
                  <label htmlFor='score'>Puntuación (entre 1 y 5)</label>
                  <InputNumber
                    id='score'
                    value={score}
                    onChange={(e) => setScore(e.value)}
                    min={1}
                    max={5}
                    required
                  />
                </div>
                <div className='p-field mt-3'>
                  <Button type='button' label='Guardar' style={{ color: '#ffffff' }} onClick={create} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export { AddReview }