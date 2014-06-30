var Game = (function()
{

    var self = this,
        items = {
            wood: {
                amount: 0,
                inc: 0
            },
            bananas: {
                amount: 0,
                inc: 0
            },
            coconuts: {
                amount: 0,
                inc: 0
            }
        },
        craft = {
            bananaPicker: {
                needed: {
                    wood: 2,
                    coconuts: 2
                },
                next: {
                    wood: 1.1,
                    coconuts: 1.2
                },
                bonus: {
                    bananas: .2
                }
            }
        },
        els = {};

    var initializeResource, render, rand, isCraftable, shakeTree;

    initializeResource = function()
    {
        els.bananas = document.getElementById('bananas');
        els.coconuts = document.getElementById('coconuts');
        els.wood = document.getElementById('wood');

        els.shakeTreeButton = document.getElementById('shakeTree');
        els.shakeTreeButton.addEventListener('click', shakeTree, false);

        els.bananaPickerButton = document.getElementById('bananaPickerButton');
    };

    render = function()
    {
        els.bananas.innerHTML = items.bananas.amount;
        els.coconuts.innerHTML = items.coconuts.amount;
        els.wood.innerHTML = items.wood.amount;


        if (isCraftable('bananaPicker')) {
            els.bananaPickerButton.classList.add('visible');
            els.bananaPickerButton.classList.remove('disabled');
        } else {
            els.bananaPickerButton.classList.add('disabled');
        }
    };

    rand = function()
    {
        return Math.floor(Math.random() * 100);
    };

    isCraftable = function(item)
    {
        var res = true;
        for (var resource in craft[item].needed) {
            if(craft[item].needed.hasOwnProperty(resource) && items[resource].amount < craft[item].needed[resource]) {
                res = false;
            }
        }
        return res;
    };

    shakeTree = function()
    {
        var r = rand();
        if (r < 5) {
            els.wood.parentNode.classList.add('visible');
            items.wood.amount += 1;
        }
        else if (r < 15) {
            els.coconuts.parentNode.classList.add('visible');
            items.coconuts.amount += 1;
        }
        else if (r < 45) {
            els.bananas.parentNode.classList.add('visible');
            items.bananas.amount += 1;
        }
    };

    return {

        init: function()
        {

            window.requestAnimFrame = (function() {
                return  window.requestAnimationFrame       ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame    ||
                        function( callback ) {
                            window.setTimeout(callback, 1000 / 60);
                        };
            })();

            initializeResource();

            (function animloop(){
                requestAnimFrame(animloop);
                render();
            })();
        }
    }

})();