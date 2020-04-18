use dogwalk;
select l.walkDate, l.timeSlot, l.dogUser, l.DogActorId, r. firstName, r.lastName
from 
	appts l
left join 
	dogactors r
on 
	l.DogActorId = r.id
left join
	dogs c
on
	r.id = c.DogActorId
where dogUser !=0 and actorType;

select l.dogName, r.firstName, r.lastName, c.walkDate, c.timeSlot
from dogs l
left join dogactors r
on l.DogActorId = r.id
left join
appts c
on l.id = c.DogId; 