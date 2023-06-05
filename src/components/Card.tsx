
import { Elemento } from "../bd"



export interface Props extends Elemento {
  isFlipped: boolean
  handleClick: (position: number) => void
  position: number
}

export const Card = ({ par, imagen, isFlipped, handleClick, position }: Props) => {


  const urlImage = `src/assets/img/${imagen}`
  console.log(urlImage);




  return (


    <div className={"card " + (isFlipped ? ' flip' : "")} data-par={'par' + par} onClick={() => handleClick(position)}>
      <div className="face-front">
        <div className="oreja-izq-ext"></div>
        <div className="oreja-der-ext"></div>

        <div className="head-cat">
          <div className="head__eye head__eye--left"></div>
          <div className="head__eye head__eye--right"></div>
          <div className="nose"></div>
          <div className="bigotes bigotes-der">
            <div className="bigote pos-1 derecha"></div>
            <div className="bigote pos-2 derecha "></div>
            <div className="bigote pos-3 derecha"></div>
          </div>
          <div className="bigotes bigotes-izq">
            <div className="bigote pos-1 izquierda"></div>
            <div className="bigote pos-2 izquierda "></div>
            <div className="bigote pos-3 izquierda"></div>
          </div>

        </div>


      </div>
      <div className="face-back">
        <img className="img-card" src={urlImage} />
      </div>
    </div>

  )
}
