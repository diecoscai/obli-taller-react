import React from 'react'

const Button = () => {
    //Retornarme un boton que reciba un onClick
    return (
        <button
            onClick={onHandleClick}
        >
            {cta}
        </button>
    )
}

//Props por defecto
Button.defaultProps = {
    //classColor: 'btn-primary',
    cta: 'Texto',
    onHandleClick: () => {}
  }

export default Button
