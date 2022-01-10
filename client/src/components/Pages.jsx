import React from "react";

export default function Pages({ recipesPerPage, allRecipes, pages }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pages">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => pages(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
