var friendArray = [
    {
        name: "Bernard",
        img: "https://i.imgur.com/gy7LL6Y.jpg",
        scores: [2, 3, 2, 5, 1, 2, 4, 5, 2, 3],
        routeName: "bernard"
    },
    {
        name: "Bob",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Bob_the_builder.jpg/220px-Bob_the_builder.jpg",
        scores: [1, 2, 4, 1, 3, 4, 5, 4, 4, 3],
        routeName: "bob"
    },
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = friendArray;
  