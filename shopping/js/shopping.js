angular.module('myapp', [])
    .controller('showItem', function ($scope) {
        var boughtList = {};

        $scope.foodsList = foodsList;

        $scope.boughtList = boughtList;

        $scope.total = 0;

        $scope.total = addTotal(boughtList);

        $scope.buyAction = function ($event) {
            $scope.total = buyAction($event, $scope.total, boughtList);
        };

        $scope.delectBoughtList = function ($event) {
            $scope.total = delectBoughtList($event, $scope.total, boughtList);
        }

        $scope.changeNumber = function ($event, num) {
            $scope.total = changeNumber($event, $scope.total, boughtList, num);
        }
    })

function countTotal(total, boughtList) {
    total = 0;
    for (var key in boughtList) {
        total += boughtList[key].price * boughtList[key].num;
    }

    return total;
}

function addBoughtList(event, foodId, boughtList) {
    if (boughtList[foodId]) {
        boughtList[foodId].num += 1;
    } else {
        var newFood = [];

        newFood.price = event.getAttribute('price');
        newFood.name = event.getAttribute('name');
        newFood.num = 1;
        newFood.id = foodId;
        boughtList[foodId] = newFood;
    }

    return boughtList;
}

function addTotal(boughtList) {
    var total;

    for (var key in boughtList) {
        total += boughtList[key].price, boughtList[key].num;
    }

    return total;
}

function buyAction(event, total, boughtList) {
    var event = event.target;
    var foodId = event.getAttribute("item-id");

    addBoughtList(event, foodId, boughtList);

    total = countTotal(total, boughtList);

    return total;
}

function delectBoughtList(event, total, boughtList) {

    var event = event.target;
    var bought = event.parentNode;
    var newBoughtList = bought.parentNode;

    newBoughtList.removeChild(bought);

    var boughtId = event.getAttribute('item-id');

    if (boughtList[boughtId]) {
        delete boughtList[boughtId];
    }
    total = countTotal(total, boughtList);

    return total;
}

function changeNumber(event, total, boughtList, num) {
    var event = event.target;
    var boughtId = event.parentNode.getAttribute('item-id');

    boughtList[boughtId].number = num;
    total = countTotal(total, boughtList);

    return total;

}

