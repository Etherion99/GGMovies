import { Dialog } from 'primereact/dialog';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useCrud } from '../../../Providers/CRUD';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { PlatformsCollection } from '/imports/db/PlatformCollection';

function MovieCreate({ onHide, visible }) {
  // obtener todas las plataformas de la BD
  const platforms = PlatformsCollection.find().fetch();

  // Contexto CRUD para interactuar con las operaciones CRUD
  const { createMovie } = useCrud();

  // Contexto CRUD para interactuar con las operaciones CRUD
  const toast = useRef(null);

  // Estados para los campos del formulario
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [image, setImage] = useState('');
  const [score, setScore] = useState(0);
  const [platformArray, setPlatformArray] = useState([]);

  // Agrega o quita un ID de plataforma al platformArray según su presencia
  const pushRemove = (id) => {
    if (platformArray.includes(id)) {
      setPlatformArray(platformArray.filter((ids) => ids !== id));
    } else {
      setPlatformArray([...platformArray, id]);
    }
  };

  // Crea una película utilizando los datos del formulario
  const create = () => {
    // Filtra las plataformas basadas en platformArray
    const platformsCreate = platforms.filter(platform =>
      platformArray.includes(platform._id)
    ).map(platformItem => {
      platformItem['addedAt'] = new Date().getTime();
      platformItem['deletedAt'] = new Date().getTime()+2592000;

      return platformItem;
    });
    // Invoca la función createMovie del contexto CRUD
    createMovie(title, synopsis, image, 0, platformsCreate);
    // Muestra un mensaje de éxito con el componente Toast
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Creada con éxito.',
      life: 3000,
    });
    // Oculta el cuadro de diálogo después de la creación
    onHide(false);
  };
  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        header={`Agrega una pelicula`}
        pt={{
          headerTitle: { className: 'flex justify-content-center text-4xl' },
        }}
        draggable={false}
        style={{ width: '80vw', height: '80vh' }}
        visible={visible}
        onHide={() => onHide(false)}
      >
        <div className='grid p-4'>
          <div className='col-8 col-offset-2'>
            <form>
              <div className='p-fluid'>
                <div className='p-field'>
                  <label htmlFor='title'>Título</label>
                  <InputText
                    id='title'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className='p-field mt-3'>
                  <label htmlFor='synopsis'>Sinopsis</label>
                  <InputTextarea
                    id='synopsis'
                    onChange={(e) => setSynopsis(e.target.value)}
                    required
                  />
                </div>

                <div className='p-field mt-3'>
                  <label htmlFor='image'>URL de la imagen</label>
                  <InputText
                    id='image'
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>

                <p className='mt-3 '>Disponible en:</p>

                {platforms.map((platform) => (
                  <div key={platform._id} className='flex align-items-center mt-2'>
                    <Checkbox
                      inputId={'platform'+platform._id}
                      name='platforms'
                      value={'platform'+platform._id}
                      onChange={() => pushRemove(platform._id)}
                      checked={platformArray.includes(platform._id)}
                    />
                    <label htmlFor={'platform'+platform._id} className='ml-2'>
                      {platform.name}
                    </label>
                  </div>
                ))}

                <div className='p-field mt-3'>
                  <Button type='button' label='Guardar' onClick={create} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export { MovieCreate };
