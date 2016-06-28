/*
 * Available information:
 * 1. Request queue
 * Simulator.get_instance().get_requests()
 * Array of integers representing floors where there are people calling the elevator
 * eg: [7,3,2] // There are 3 people waiting for the elevator at floor 7,3, and 2, in that order
 *
 * 2. Elevator object
 * To get all elevators, Simulator.get_instance().get_building().get_elevator_system().get_elevators()
 * Array of Elevator objects.
 * - Current floor
 * elevator.at_floor()
 * Returns undefined if it is moving and returns the floor if it is waiting.
 * - Destination floor
 * elevator.get_destination_floor()
 * The floor the elevator is moving toward.
 * - Position
 * elevator.get_position()
 * Position of the elevator in y-axis. Not necessarily an integer.
 * - Elevator people
 * elevator.get_people()
 * Array of people inside the elevator
 *
 * 3. Person object
 * - Floor
 * person.get_floor()
 * - Destination
 * person.get_destination_floor()
 * - Get time waiting for an elevator
 * person.get_wait_time_out_elevator()
 * - Get time waiting in an elevator
 * person.get_wait_time_in_elevator()
 *
 * 4. Time counter
 * Simulator.get_instance().get_time_counter()
 * An integer increasing by 1 on every simulation iteration
 *
 * 5. Building
 * Simulator.get_instance().get_building()
 * - Number of floors
 * building.get_num_floors()
 */

Elevator.prototype.decide = function() {
    var simulator = Simulator.get_instance();
    var building = simulator.get_building();
    var num_floors = building.get_num_floors();
    var elevators = Simulator.get_instance().get_building().get_elevator_system().get_elevators();
    var time_counter = simulator.get_time_counter();
    var requests = simulator.get_requests();

    var elevator = this;
    var people = this.get_people();

    //since person's destination is unknown until they enter the elevator,
    //optimizing for queue reduction is futile. instead, prioritize unload and ignore queue
    if(people.length > 0) {
        var destination = [];
        var len = people.length;
        if(len > 1) {
            for (var i = 0; i < len; i++) {
                destination.push(people[i].get_destination_floor());
            }
            destination.sort(function(lhs,rhs){
                lhs = elevator.get_destination_floor() - lhs;
                rhs = elevator.get_destination_floor() - rhs;
                return lhs - rhs;
            }.bind(elevator));
        } else {
            destination.push(people[0].get_destination_floor());
        }
        return elevator.commit_decision(destination[0]);
    }

    for(var i = 0;i < requests.length;i++) {
        var handled = false;
        for(var j = 0;j < elevators.length;j++) {
            if(elevators[j].get_destination_floor() == requests[i]) {
                handled = true;
                break;
            }
        }
        if(!handled) {
            return elevator.commit_decision(requests[i]);
        }
    }

    return elevator.commit_decision(Math.floor(num_floors / 2));
};