import React, { Component } from "react";
import API from "../../api";

import _get from 'lodash.get';

import FieldTitle from './DisplayFields/Title';
import FieldImage from './DisplayFields/Image';
import FieldText from './DisplayFields/Text';
import FieldGroup from './DisplayFields/Group';

const displayFields = [
  { 
    apiKey: 'name', 
    fieldName: 'Name', 
    fieldComponent: FieldTitle,
    fnFieldFormat: fieldValue => (fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1))
  },
  { 
    apiKey: 'sprites.other.official-artwork.front_default', 
    fieldName: 'Pokemon Image', 
    fieldComponent: FieldImage
  },
  { 
    apiKey: 'height', 
    fieldName: 'Height', 
    fieldComponent: FieldText 
  },
  { 
    apiKey: 'weight', 
    fieldName: 'Weight', 
    fieldComponent: FieldText 
  },
  { 
    apiKey: 'base_experience', 
    fieldName: 'Base Experience', 
    fieldComponent: FieldText 
  },
  {
    apiKey: 'stats',
    fieldName: 'Stats',
    fieldComponent: FieldGroup,
    fnFieldFormat: fieldValue => fieldValue.map(stat => ({
      fieldName: stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1),
      fieldValue: stat['base_stat'],
      fieldComponent: FieldText
    }))
  },
  {
    apiKey: 'types',
    fieldName: 'Types',
    fieldComponent: FieldGroup,
    fnFieldFormat: fieldValue => fieldValue.map(({ type }) => ({
      fieldName: null,
      fieldValue: type.name.charAt(0).toUpperCase() + type.name.slice(1),
      fieldComponent: FieldText
    }))
  },
  {
    apiKey: 'abilities',
    fieldName: 'Abilities',
    fieldComponent: FieldGroup,
    fnFieldFormat: fieldValue => fieldValue.map(({ ability }) => ({
      fieldName: null,
      fieldValue: ability.name.charAt(0).toUpperCase() + ability.name.slice(1),
      fieldComponent: FieldText
    }))
  },
  {
    apiKey: 'moves',
    fieldName: 'Moves',
    fieldComponent: FieldGroup,
    fnFieldFormat: fieldValue => fieldValue.map(({ move }) => ({
      fieldName: null,
      fieldValue: move.name.charAt(0).toUpperCase() + move.name.slice(1),
      fieldComponent: FieldText
    }))
  }
  //{ apiKey: 'abilities' }
];

export default class DisplayPokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonName: null,
      pokemonDetails: null
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate() {
    if(!this.state.pokemonDetails) {
      this.handleFetch();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(state.pokemonName === props.displayPokemon ) {
      // We are rendering the same pokemon - no need to update state
      return state; 
    }

    // The Pokemon name has changed, reset the state with the new name
    return {
      ...state,
      pokemonName: props.displayPokemon,
      pokemonDetails: null
    };
  }

  render() {
    if(!this.state.pokemonDetails) {
      return (<div className="col"><span>Loading...</span></div>);
    }

    return (
      <div className="col h-100">
        <div className="row gy-3 h-100 overflow-auto">
          {displayFields.map((fieldInfo, i) => this.buildDisplayField(fieldInfo, i))}
        </div>
      </div>
    );
  }

  buildDisplayField(fieldInfo, i) {
    let { pokemonDetails } = this.state;

    // Get the Field Value
    let fieldValue = _get(pokemonDetails, fieldInfo.apiKey);

    // Format Field if needed
    if(fieldInfo.fnFieldFormat) {
      fieldValue = fieldInfo.fnFieldFormat(fieldValue);
    }

    return <div key={i}><fieldInfo.fieldComponent fieldValue={fieldValue} {...fieldInfo} /></div>;
  }

  handleFetch() {
    API.getPokemonDetail(this.state.pokemonName).then(data => {
      this.setState({ pokemonDetails: data });
    });
  }
}
