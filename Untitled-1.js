<!DOCTYPE html>
<html ng-app="todoApp">
<head>
    <title>TO DO List</title>
    <link href="bootstrap.css" rel="stylesheet" />
    <link href="bootstrap-theme.css" rel="stylesheet" />
    <script src="angular.js"></script>
   <script>
    var model={
        user: "Mootez",
        Matiere:["Statique","Sinectique","Analyse"];
    };
    
    
   </script>
</head>

<body ng-controller="ToDoCtrl">
    <div class="page-header">
        <h1>
            {{todo.user}}'s To Do List
            <span class="label label-default">{{todo.items.length}}</span>
        </h1>
    </div>
    <div class="panel">
        <div class="input-group">
            <input class="form-control" />
            <span class="input-group-btn">
                <button class="btn btn-default">Add</button>
            </span>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Done</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in todo.items">
                    <td>{{item.action}}</td>
                    <td>{{item.done}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>


</html>
