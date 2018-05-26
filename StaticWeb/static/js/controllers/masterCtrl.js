
angular.module('myApp.controllers',[]);


//Kontroler użyty na panelu userów (panel zarządzania danymi)
angular.module('myApp.controllers')
.controller('masterCtrl',
    ['$rootScope','$scope', '$http', '$timeout', '$interval',
        function ($rootScope, $scope, $http, $timeout, $interval) {
            //To jest uruchamiane przy każdym wejściu do widoku korzystającego z tego kontrolera
            //Lokalny obiekt modelu, tworzony przy każdym uruchomieniu kontrolera
            $scope.M = {};
            $scope.M.appItems = [];
            $scope.M.users = [];
            $scope.M.message = '';
            $scope.newItem = {};
            $scope.fff = '';
            $scope.current_path = '.';
            $scope.filenames = [];
            $scope.M.selected_filename='.';

            $scope.cleanItem = function () {
                $scope.newItem = {id: '0', title: '', body: ''};
                console.log('New item set')
            };

            $scope.sendNewItem = function() {
                return $http({
                    url: $rootScope.M.URL + '/items',
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify($scope.newItem)
                    // ,
                    // params: any_object
                }).success(function(data){
                    alert('Send operation OK' + data);
                    $scope.loadArray();
                    $scope.cleanItem();
                    $scope.newItem = null;
                });
            };

            //////////////////////////////////////////
            // Zestaw funkcji do zarzadzania pytaniami

            $scope.M.questions = [];
            $scope.M.types = [];

            //add adding new question
            $scope.loadQuestions = function() {
                $http.get($rootScope.M.URL + '/questions')
                    .success(function (data) {
                        $scope.M.questions = data;
                    })
            };

            $scope.saveQuestion = function(qu) {
                console.log("zapisuję pytanie");
                return $http({
                    url: $rootScope.M.URL + '/questions',
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify(qu)
                }).success(function(data){
                    console.log('Saved question qid=' + qu.qid)
                });
            };

            $scope.deleteQuestion = function(qu) {
                console.log("wycinam...");
                return $http({
                    url: $rootScope.M.URL + '/questions/' + qu.qid,
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }).success(function(data){
                    console.log('Deleted question qid=' + qu.qid)
                });
            };

            $scope.saveAllQuestions = function () {
                console.log('Saving all questions');
                $scope.M.questions.forEach(function(q){
                    $scope.saveQuestion(q);
                });
            };

            ///////////////////////////////
            $scope.loadTypes = function() {
                $http.get($rootScope.M.URL + '/qtypes')
                    .success(function (data) {
                        $scope.M.types = data;
                    })
            };



            $scope.addQuestion = function () {
                let nowy = {
                    "qid": null,
                    "text": "",
                    "answer1": "",
                    "answer2": "",
                    "answer3": "",
                    "correct": 1,
                    "typeid": 1,
                    "active": true
                };
                $scope.M.questions.push(nowy);

            };


            //startup
            $scope.loadQuestions();
            $scope.loadTypes();


            //////////////////////////////////////////



            $scope.loadUsers = function() {
                $http.get($rootScope.M.URL + '/users')
                    .success(function (data) {
                        $scope.M.users = data;
                        // $scope.M.appItems.sort(function (a, b) {
                        //     return a.title.toLowerCase() > b.title.toLowerCase();
                        // })
                    })
            };

            //lists files
            $scope.listFiles = function(path) {
                let par = {
                    path: path
                };
                return $http({
                    url: $rootScope.M.URL + '/files',
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    params: par
                }).success(function(data){
                    $scope.filenames = data;
                });
            }

            $scope.upload = function () {
                console.log('uploading file!');
                const f = document.getElementById('uploadedfiles').files[0];
                let r = new FileReader();
                r.onloadend = function (e) {
                    let url = $rootScope.M.URL + '/files/upload';
                    let formData = new FormData();
                    formData.append('file', f);

                    $http.post(url, formData, {
                        headers: {'Content-Type': undefined}
                    }).success(function (msg) {
                        console.log('OK');
                    }).error(function (msg) {
                        console.log('Sending file failed');
                    });
                };
                r.readAsDataURL(f);
            };

            $scope.uploadFile = function(event){
                var files = event.target.files;
                console.log(files);
                const f = files[0];
                console.log(f);
                let r = new FileReader();
                r.onloadend = function (e) {
                    let url = $rootScope.M.URL + '/files/upload';
                    let formData = new FormData();
                    formData.append('file', f);

                    $http.post(url, formData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (msg) {
                        console.log('OK');
                    }).error(function (msg) {
                        console.log('Sending file failed');
                    });
                };
                r.readAsDataURL(f);
            };


            // $timeout(function(){
            //     $scope.M.message += '.';
            //     alert('Done');
            // }, 1000);

            // $interval(function(){
            //     $scope.M.message += 'x';
            // }, 2000);

        }
    ]
);
