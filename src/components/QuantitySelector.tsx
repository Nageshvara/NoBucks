import { Minus,Plus } from "lucide-react"
import { Button } from "./ui/button"

interface QuantitySelectorProps{
    quantity:number;
    onIncrease:()=>void;
    onDecrease:()=>void;
    size?:'sm'|'md'|'lg';
}

const QuantitySelector = ({quantity,onIncrease,onDecrease,size='md'}:QuantitySelectorProps) => {
  
    const sizeClasses = {
        sm: {
          container: 'h-8',
          button: 'h-8 w-8',
          icon: 'h-3 w-3',
          text: 'text-sm'
        },
        md: {
          container: 'h-10',
          button: 'h-10 w-10',
          icon: 'h-4 w-4',
          text: 'text-base'
        },
        lg: {
          container: 'h-12',
          button: 'h-12 w-12',
          icon: 'h-5 w-5',
          text: 'text-lg'
        },
      };
      
      const classes = sizeClasses[size];
  
    return (
    <div className={`inline-flex items-center rounded-md border ${classes.container}`}>
      <Button variant='ghost' size='icon' onClick={onDecrease} disabled={quantity<=1} className={`rounded-none border-r ${classes.button}`}>
        <Minus className={classes.icon}/>
        <span className="sr-only">Decrease</span>
      </Button>
      <div className={`flex w-12 items-center justify-center ${classes.text}`}>
        {quantity}
      </div>
      <Button variant='ghost' size='icon' onClick={onIncrease} className={`rounded-none border-1 ${classes.button}`}>
        <Plus className={classes.icon}/>
        <span className="sr-only">Increase  </span>
      </Button>
    </div>
  )
}

export default QuantitySelector
