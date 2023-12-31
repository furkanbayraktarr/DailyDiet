import Input from '../Input'

const SearchBar =(props)=>{

return(
    <Input
    placeholder='Ara...'
    placeholderTextColor='white'
    onType={props.onSearch}
    theme="alternative"
    />
  
)

}

export default SearchBar