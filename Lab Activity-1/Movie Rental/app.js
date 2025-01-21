var app = angular.module('movieRentalApp', []);

// Custom service for calculating rental prices
app.service('RentalService', function () {
    this.calculatePrice = function (year) {
        const currentYear = new Date().getFullYear();
        if (currentYear - year <= 3) {
            return 5; // Higher price for recent movies
        }
        return 3; // Discounted price for older movies
    };
});

// Controller
app.controller('MovieController', ['$scope', 'RentalService', function ($scope, RentalService) {
    // Initial movie dataset with at least 2 movies per genre
    $scope.movies = [
        { title: 'Inception', genre: 'Sci-Fi', year: 2010 },
        { title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
        { title: 'Parasite', genre: 'Drama', year: 2019 },
        { title: 'The Pursuit of Happyness', genre: 'Drama', year: 2006 },
        { title: 'The Dark Knight', genre: 'Action', year: 2008 },
        { title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
        { title: 'The Lion King', genre: 'Animation', year: 1994 },
        { title: 'Frozen', genre: 'Animation', year: 2013 }
    ];

    // Extract unique genres
    $scope.genres = [...new Set($scope.movies.map(movie => movie.genre))];

    // Define year options
    $scope.yearOptions = ['Latest', 'Oldest'];

    // Initialize filters
    $scope.selectedGenre = '';
    $scope.selectedYear = '';

    // Filter and sort movies
    $scope.filterMovies = function () {
        let filteredMovies = $scope.movies;

        // Filter by genre
        if ($scope.selectedGenre) {
            filteredMovies = filteredMovies.filter(movie => movie.genre === $scope.selectedGenre);
        }

        // Sort by year
        if ($scope.selectedYear === 'Latest') {
            // Sort in descending order (latest to oldest)
            filteredMovies = filteredMovies.sort((a, b) => b.year - a.year);
        } else if ($scope.selectedYear === 'Oldest') {
            // Sort in ascending order (oldest to latest)
            filteredMovies = filteredMovies.sort((a, b) => a.year - b.year);
        }

        return filteredMovies;
    };

    // Get rental price using the custom service
    $scope.getRentalPrice = function (movie) {
        return RentalService.calculatePrice(movie.year);
    };

    // Add a new movie
    $scope.newMovie = {};
    $scope.errorMessage = '';

    $scope.addMovie = function () {
        // Check if the title is unique
        if ($scope.movies.some(m => m.title === $scope.newMovie.title)) {
            $scope.errorMessage = 'Movie title must be unique.';
            return;
        }
        $scope.errorMessage = '';
        $scope.movies.push($scope.newMovie);
        $scope.genres = [...new Set($scope.movies.map(movie => movie.genre))];
        $scope.newMovie = {}; // Clear the form
    };
}]);
