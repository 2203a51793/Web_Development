var app = angular.module('movieRentalApp', []);
app.service('RentalService', function () {
    this.calculatePrice = function (year) {
        const currentYear = new Date().getFullYear();
        if (currentYear - year <= 3) {
            return 5; 
        }
        return 3; 
    };
});

app.controller('MovieController', ['$scope', 'RentalService', function ($scope, RentalService) {
    
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
    $scope.genres = [...new Set($scope.movies.map(movie => movie.genre))];
    $scope.yearOptions = ['Latest', 'Oldest'];
    $scope.selectedGenre = '';
    $scope.selectedYear = '';
    $scope.filterMovies = function () {
        let filteredMovies = $scope.movies;
        if ($scope.selectedGenre) {
            filteredMovies = filteredMovies.filter(movie => movie.genre === $scope.selectedGenre);
        }
        if ($scope.selectedYear === 'Latest') {
            filteredMovies = filteredMovies.sort((a, b) => b.year - a.year);
        } else if ($scope.selectedYear === 'Oldest') {
            filteredMovies = filteredMovies.sort((a, b) => a.year - b.year);
        }
        return filteredMovies;
    };
    $scope.getRentalPrice = function (movie) {
        return RentalService.calculatePrice(movie.year);
    };
    $scope.newMovie = {};
    $scope.errorMessage = '';
    $scope.addMovie = function () {
        
        if ($scope.movies.some(m => m.title === $scope.newMovie.title)) {
            $scope.errorMessage = 'Movie title must be unique.';
            return;
        }
        $scope.errorMessage = '';
        $scope.movies.push($scope.newMovie);
        $scope.genres = [...new Set($scope.movies.map(movie => movie.genre))];
        $scope.newMovie = {}; 
    };
}]);
