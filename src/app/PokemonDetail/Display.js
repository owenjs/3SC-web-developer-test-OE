import React, { Component } from "react";
import API from "../../api";

// https://lodash.com/docs/4.17.15#get
import _get from 'lodash.get';

import FieldTitle from './DisplayFields/Title';
import FieldImage from './DisplayFields/Image';
import FieldText from './DisplayFields/Text';
import FieldGroup from './DisplayFields/Group';

// Metadata for the fields that are displayed for each Pokemon Detail
// 
// Example of Field Metadata:
// {
//    apiKey: Required - The path in the results JSON for the value of this field
//    fieldName: The written name of the field to display on the form
//    fieldComponent: Required - The React Component used to display the Field
//    fnFieldFormat: Function to format the field value before it is displayed
// }
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
];

/** @class Displays a Pokemon's Statistics */
export default class DisplayPokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonName: null,
      pokemonDetails: null
    };
  }

  /**
   * Fetch initial Pokemon data after first render
   */
  componentDidMount() {
    this.handleFetch();
  }

  /**
   * Fetch Pokemon Data again if the Pokemon's Details are now missing
   */
  componentDidUpdate() {
    if(!this.state.pokemonDetails) {
      this.handleFetch();
    }
  }

  /**
   * When the props change check if the pokemon the component is displaying has
   * changed, if so then update the state before re-render so that it will be 
   * forced to fetch the new Pokemon's data
   * 
   * @param {Object} props new props
   * @param {Object} state current state
   * @returns new State before re-render
   */
  static getDerivedStateFromProps(props, state) {
    if(state.pokemonName === props.displayPokemon ) {
      // We are rendering the same pokemon - no need to update state
      return state; 
    }

    // The Pokemon name has changed, reset the state with the new name 
    // and remove the current details
    return {
      ...state,
      pokemonName: props.displayPokemon,
      pokemonDetails: null
    };
  }

  /**
   * @returns JSX for the Pokemon Details
   */
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

  /**
   * Using the given metadata, prepare the props for the field's component
   * 
   * @param {Object} fieldInfo The metadata for the field being built
   * @param {Integer} i index of Field
   * @returns 
   */
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

  /**
   * Fetch the Pokemon's Statistics from the API
   */
  handleFetch() {
    API.getPokemonDetail(this.state.pokemonName).then(data => {
      this.setState({ pokemonDetails: data });
    });
  }
}
