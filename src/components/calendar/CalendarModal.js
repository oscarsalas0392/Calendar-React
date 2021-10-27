import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

const now= moment().minutes(0).second(0).add(1,'hours');
const aux= moment().minutes(0).second(0).add(2,'hours');


const initEvent = {

    title:'',
    notes:'',
    start:now.toDate(),
    end:aux.toDate()
}

export const CalendarModal = () => {

    const {modalOpen} = useSelector( state => state.iu );
    const {activeEvent} = useSelector( state => state.caledar );
    const dispatch = useDispatch();


    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(aux.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setformValues] = useState(initEvent);
    const {notes,title,start,end} = formValues;


    useEffect(() => {
        if(activeEvent){
            setformValues(activeEvent);
        }
        else{
            setformValues(initEvent);
        }
    }, [activeEvent])

   const closeModal = (e)=>{
        dispatch(uiCloseModal);
        dispatch(eventClearActiveEvent());
        setformValues(initEvent);
   }

   const handleStartDateChange = (e)=>{
     setDateStart(e);
  
     setformValues({
        ...formValues,
        start:e
    })
   }

   const handleEndDateChange= (e)=>{
    setDateEnd(e);
    setformValues({
        ...formValues,
        end:e
    })
  }

  const handleInputChange= ({target})=>{
   
     setformValues({
         ...formValues,
         [target.name]:target.value
     })
  }

  const handleSubmitForm=(e)=>{
   e.preventDefault();
   
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd))
        {
            return  Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error');
        }

        if(title.trim().length < 2 )
        {
            setTitleValid(false);
        }

        if(activeEvent)
        {
            console.log(formValues);
            dispatch(eventUpdated(formValues));
        }
        else{

        dispatch(eventAddNew({
            ...formValues,
            id:new Date().getTime(),
            user:{
                _id:'123',
                name:'Oscar'
            }
        }));
        }

        setTitleValid(true);
        closeModal();
  }

    return (
            <Modal
            isOpen={modalOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            >
                    <h1> {activeEvent ? 'Editar Evento' : 'Nuevo Evento'}</h1>
                    <hr />
                    <form className="container" onSubmit={handleSubmitForm}>

                        <div className="form-group">
                            <label>Fecha y hora inicio</label>
                            <DateTimePicker 
                            onChange={handleStartDateChange}  
                            value={dateStart} 
                            className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Fecha y hora fin</label>
                            <DateTimePicker 
                            onChange={handleEndDateChange}  
                            value={dateEnd} 
                            className="form-control" 
                            minDate={dateStart}/>
                        </div>

                        <hr />
                        <div className="form-group">
                            <label>Titulo y notas</label>
                            <input 
                                type="text" 
                                className={`form-control ${!titleValid && 'is-invalid'}`}
                                placeholder="Título del evento"
                                name="title"
                                autoComplete="off"
                                value={title}
                                onChange={handleInputChange}
                            />
                            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                        </div>

                        <div className="form-group">
                            <textarea 
                                type="text" 
                                className="form-control"
                                placeholder="Notas"
                                rows="5"
                                name="notes"
                                value={notes}
                                onChange={handleInputChange}
                            ></textarea>
                            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block w-100"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>

                    </form>
            </Modal>
    )
}
