import React, { useEffect } from "react";
import { useHttp } from "../hooks/http";
import Summary from "./Summary";

const Character = props => {
  // ShouldComponentUpdate is supposed to prevent the component from re-rendering. when parent cpn re-render, if the props of the child cpn does not change, then the child should not re-render

  /**
   * @returns true => render
   * @returns false => do not render
   */
  /* shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return (
      nextProps.selectedChar !== this.props.selectedChar ||
      nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
      nextState.isLoading !== this.state.isLoading
    );
  } */

  /* useEffect(() => {
    console.log("useEffect char");
    fetchData();
    // The function execute right before use effect will run the next time
    return () => {
      console.log("Cleaning up");
    };
  }, [props.selectedChar]); */

  const [isLoading, isFetchedData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );
  const loadedCharacter = isFetchedData
    ? {
        id: props.selectedChar,
        name: isFetchedData.name,
        height: isFetchedData.height,
        colors: {
          hair: isFetchedData.hair_color,
          skin: isFetchedData.skin_color
        },
        gender: isFetchedData.gender,
        movieCount: isFetchedData.films.length
      }
    : null;

  // This useEffect only excute once only when the component unmount
  useEffect(() => {
    return () => {
      console.log("Component did unmount");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

// React.memo is a substitute for shouldComponenUpdate
// Basically you do not setup callback function for memo because react will check props for you.
// You should have callback function when you have a prop that its change should not trigger the render
export default React.memo(Character, (prevProps, nextProps) => {
  /**
   * @return true => should not re-render
   * @return false => should re-render
   */
  return nextProps.selectedChar === prevProps.selectedChar;
});
