import React from "react";

const Header = ({ name }) => (
  <>
    <h2>{name}</h2>
  </>
);

const Part = ({ name }) => (
  <>
    <p>{name}</p>
  </>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} />
    ))}
  </>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
