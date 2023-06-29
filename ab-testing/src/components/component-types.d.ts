type SharedComponentProps = {
    'data-component-path': string;
};

export type Component<T> = React.FC<T & SharedComponentProps>;
