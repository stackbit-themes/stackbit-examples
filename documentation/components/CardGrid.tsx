import { CardGrid as CardGridProps } from '@/types';
import { Card } from './Card';

export const CardGrid: React.FC<CardGridProps> = (props) => {
    return (
        <div className="grid grid-cols-3 gap-6 my-6" data-sb-object-id={props._id}>
            {props.cards.map((card, index) => {
                return <Card key={index} {...card} />;
            })}
        </div>
    );
};
