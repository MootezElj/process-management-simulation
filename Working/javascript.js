//Le modele qu'on va utiliser dans l'application
var model={
    prioriteeNeeded:false,
    tempExecutionMoyen:0,
    processusList:[{
    nomProcessus:"p1",
    tempExecution:3,
    dateArrivee:5,
    prioritee:0,
    pret:false,
debutExecution:0,
finExecution:0}]
};

//objet qui sert a determiner les fonctions utilisé d'après l'utilisateur, sert a l'affichage dans la page HTML
var usedFunction={
    sjf:false,
    rr:false,
    prioritee:false
};


var todoApp=angular.module("todoApp",[]);
todoApp.controller("ToDoCtrl",function ($scope){
   

   //fonction qui control le control d'un processus saisie depuis la page HTML
   $scope.valide=function(nomProcessus_,tempExecution_,dateArrivee_,prioritee_)
   {
        if (($scope.todo.prioriteeNeeded)&&(typeof nomProcessus_=='string')&&(!isNaN(tempExecution_))&&(!isNaN(dateArrivee_))&&(!isNaN(prioritee_))&&(!nomProcessus_=="")&&(tempExecution_!="")&&(dateArrivee_!="")&&(prioritee_!=""))
        return true;
        else
       return ((typeof nomProcessus_=='string')&&(!isNaN(tempExecution_))&&(!isNaN(dateArrivee_))&&(!nomProcessus_=="")&&(!tempExecution_=="")&&(!dateArrivee_==""));
   }
   
   //fonction qui ajoute un processus, utilisé depuis le boutton dans index.html
    $scope.ajouterProcessus=function(nomProcessus_,tempExecution_,dateArrivee_,prioritee_)
    {
        
        if($scope.valide(nomProcessus_,tempExecution_,dateArrivee_,prioritee_))
        $scope.todo.processusList.push({nomProcessus:nomProcessus_,tempExecution:tempExecution_,dateArrivee:dateArrivee_,prioritee:prioritee_});
    }
   
    //23/11/2017
   
   $scope.updateList=function(temp,processusList_)
   {
    for (var i=0;i<processusList_.length;i++)
    if(processusList_[i].dateArrivee<=temp){processusList_[i].pret=true;}
   }
    //efface le processus saisie en parametre
    $scope.effacerProcessus=function(proces)
    {
        var processusAEfface=$scope.todo.processusList.indexOf(proces);
        $scope.todo.processusList.splice(processusAEfface,1);
    }

    //fonction qui definie et retourne les processus pret
    $scope.getReady=function(temp,ProcessusListUpdate)
    {
        var tab=[];
        for(var i=0; i<ProcessusListUpdate.length; i++)  
        {
        if(ProcessusListUpdate[i].pret){tab.push(ProcessusListUpdate[i]);}
        }
        return tab;
    }
        
    //retourne le processus qui a le minum du temps d'execution
        $scope.processusMinTempExecution=function(tabTest)
        {
            var minProcessus=tabTest[0];
            var minTempExecution=tabTest[0].tempExecution;
            for(var i=1; i<tabTest.length; i++)
            {
                if (tabTest[i].tempExecution*1<minTempExecution*1){minTempExecution=tabTest[i].tempExecution;minProcessus=tabTest[i];}
            }
              return(minProcessus);
        }

        //fonction qui determine le temp d'éxecution total des processus
        /*
        $scope.tempTotalExecution=function()
        {   var temp=0;
            var echel=1;
            for (var i=0;i<model.length;i++)
            {
                temp+=model.processusList[i].tempExecution;
            }
           
            while(temp>100)
            {

            }
            return temp;
        }*/

        //determine le temp d'execution moyen en chaine de caractere et valeur
        $scope.tempExecutionMoyenTodo=function(diagramme)
        {
            var ch="[";
            var sm=0;
            for(var i=0;i<diagramme.length;i++)
            {
                ch=ch+"("+diagramme[i].finExecution+"-"+diagramme[i].dateArrivee+")+";
                sm+=(diagramme[i].finExecution-diagramme[i].dateArrivee);
            }
            sm/=diagramme.length;
            ch=ch+"0]/"+diagramme.length;
            ch+="=";
            return {chaine:ch,moyenne:sm};
        }
        //27/11/2017 tous marche bien

        //fonction qui retourne un tableau representant le trie selon l'algorithme SJF
        $scope.sjfDiagrame=function()
        {
            var tempCourant=prompt('Saisir le temp de depart',0)*1;
            if (!isNaN(tempCourant))
            {
            var diagramme=[];
            var sjf=model.processusList.slice();
            var i=0;
            
            while(sjf.length!=0)
            {
                $scope.updateList(tempCourant,sjf);
                var tab=$scope.getReady(tempCourant*1,sjf);
                
                if (tab.length==0) tempCourant++;
                else{
                    diagramme.push($scope.processusMinTempExecution(tab));
                    diagramme[i].debutExecution=tempCourant;
                    tempCourant=tempCourant+($scope.processusMinTempExecution(tab).tempExecution*1);
                    diagramme[i].finExecution=tempCourant;
                    var processusAEfface=sjf.indexOf($scope.processusMinTempExecution(tab));
                    sjf.splice(processusAEfface,1);
                    i++;
                    }
            }
        
          $scope.sjfTodo=diagramme;
          var tempExecutionMoyen=$scope.tempExecutionMoyenTodo($scope.sjfTodo);
          $scope.usedFunctions.sjf=true;
          $scope.chaineTempExecutionMoeyenTodo=tempExecutionMoyen.chaine;
          $scope.tempExecutionMoyenNumberTodo=tempExecutionMoyen.moyenne;
          return diagramme;
            }
        }
        
        
    $scope.todo=model;
    $scope.usedFunctions=usedFunction;
   
   
})
/*
$scope.effacerProcessus=function(proces)
{
    var processusAEfface=$scope.todo.processusList.indexOf(proces);
    $scope.todo.processusList.splice(processusAEfface,1);
}

   //fonction de trie
 sjf.sort(function(a, b) {
            return parseFloat(a.dateArrivee) - parseFloat(b.dateArrivee);
        });




         while(sjf.length!=0)
        {
            var tab=$scope.getReady(tempCourant,sjf);
            if (tab.length==0) tempCourant++;
            else{
            diagramme.push($scope.processusMinTempExecitoon(tab));
            tempCourant=tempCourant+$scope.processusMinTempExecitoon(tab).tempExecution;
            var processusAEfface=sjf.indexOf(processusMinTempExecitoon(tab));
            sjf.splice(processusAEfface,1);
        }
        }

          $scope.sjfTodo=diagramme;



          */