import React from "react";
import { useHttp } from "../hooks/http";
import "./CharPicker.css";

const CharPicker = props => {
  // NOTE: customized hook
  // To handle side effect including HTTP request, run after component is rendered
  /**
   * 2nd @param [] an array of dependencies. If any value in the array change, the component will render again and run the function pass in the 1st @param. When it is empty, useEffect run only once.
   */
  /* useEffect(() => {
    setIsLoading(true);
    console.log("use Effect runs");
    fetch("https://swapi.co/api/people")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(charData => {
        setIsLoading(false);
        const selectedselectedCharacters = charData.results.slice(0, 5);
        setselectedCharacters(
          selectedselectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []); */

  const [isLoading, fetchedData] = useHttp("https://swapi.co/api/people", []);
  const selectedCharacters = fetchedData
    ? fetchedData.results.slice(0, 5).map((char, index) => ({
        name: char.name,
        id: index + 1
      }))
    : [];

  let content = <p>Loading selectedCharacters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
