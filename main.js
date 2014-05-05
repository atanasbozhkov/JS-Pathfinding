//Dirty hack for surpressing the right click menu.
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

function Node(x, y) {
    this.x = x;
    this.y = y;
    this.state = 'empty';
    this.size = 50;

    this.setSize = function(size) {
        this.size = size;
    }

    this.setState = function(state) {
        this.state = state;
    }

    this.plot = function() {

        return '<div class="square">' + this.x + ',' + this.y + '</div>';

    }

}

function idToCoordinates(id){
	var ret = [];
	ret[1] = id.substring(1,2);
	ret[0] = id.substring(2,3);
	return ret;
}

function changeStateTo(state,obj,matrix){
	switch(state){
		case 'wall':
			obj.style.backgroundColor = '#000';
			obj.style.color = '#fff';
			var coords = idToCoordinates(obj.id);
			matrix[coords[0]][coords[1]].setState('wall');
			break;
		case 'empty':
			obj.style.backgroundColor = '#fff';
			obj.style.color = '#000';
			var coords = idToCoordinates(obj.id);
            matrix[coords[0]][coords[1]].setState('empty');
            console.log(obj.style.backgroundColor)
			break;
        case 'start':
            obj.style.backgroundColor = '#0f0';
            obj.style.color = '#000';
            var coords = idToCoordinates(obj.id);
            matrix[coords[0]][coords[1]].setState('start');
            break;
        case 'end':
            obj.style.backgroundColor = '#f00';
            obj.style.color = '#000';
            var coords = idToCoordinates(obj.id);
            matrix[coords[0]][coords[1]].setState('end');
            break;

	}
}

function Grid(x, y) {
    //Size of the grid
    this.x = x;
    this.y = y;
    //Initialise the node matrix representation
    this.matrix = [];
    var div = document.createElement('div');
    var temp = new Node(0, 0);
    size = temp.size;
    div.style.width = y * (size);
    document.body.appendChild(div);

    for (var k = 0; k < y; k++) {
        this.matrix[k] = new Array(x);
    }
    //Fill in the matrix.
    for (var i = 0; i < x; i++) {
        for (var x = 0; x < y; x++) {
            this.matrix[i][x] = new Node(i, x);
            var newDiv = document.createElement('div');
            newDiv.className = 'square';
			newDiv.id = 'i'+ String(i)+ String(x);
            newDiv.innerHTML = i + ',' + x;
			//Add a function for toggling the wall state of the node
			var that = this;
			newDiv.toggleState = function(pointer){ 
				if (pointer.style.backgroundColor == 'rgb(0, 0, 0)') {
                    changeStateTo('empty',pointer,that.matrix);

				} else {
                    changeStateTo('wall',pointer,that.matrix);


				}
			}
			newDiv.rightClick = function(pointer){
                if(pointer)
                changeStateTo('start',pointer,that.matrix);

			}
			//Attach the function to the div as a callback
			newDiv.setAttribute('onClick', 'this.toggleState(this)');
			newDiv.setAttribute('oncontextmenu', 'this.rightClick(this)');
			div.appendChild(newDiv);
		}
	}
}

