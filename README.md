Elevator Simulation Problem

Edit only the function definition of Elevator.prototype.decide() in myelevator.js.
That function is called when elevator needs to decide which floor it needs to go to.
Try to:

1. minimize total_people_wait_time_in_elevator
2. minimize total_people_wait_time_out_elevator
3. minimize total_elevator_traveled_distance
4. maximize total_delivered_people

Result (averaged from 10 run)

test                                                    | wait outside  | wait inside   | delivered | distance
--------------------------------------------------------|---------------|---------------|-----------|---------
[original](5c14364ac3f18c18b07c9bd80bc2bccc8b7778f6)    | 12.0516       | 23.2096       | 129.0     | 2980.2
[unload 1st](6a83a8b1640b631b5385d9694c5e147ff46866fe)  | 7.8104        | 18.9856       | 137.2     | 2858.0
