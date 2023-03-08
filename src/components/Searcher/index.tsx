import { Input } from "antd";

type SearchProps = {
    onSearch: (value: string) => void;
}

const Searcher = ( {onSearch}: SearchProps) => {
    return <Input placeholder='Buscar...' onChange={ (e : React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}/>;
};

export default Searcher;