function Area(Name, Barrels, Crowns) 
{
this.Name = Name
this.Barrels = Barrels
this.Crowns = Crowns
}

function Border(left, right)
{
 this.left = left
 this.right = right
 this.GetBorderArea = function(area) 
 {
  if(area == left)
      return right
   if(area == right)
       return left
    return null
 }
}

// Map setup
var areas = [new Area('test 1', 1, 2),new Area('test 2', 1, 2),new Area('test 3', 1, 2) ]
var borders = [new Border(areas[0], areas[1]), new Border(areas[1], areas[2])]


function Unit(soldiers, routed)
{
 this.soldiers = soldiers
 this.routed = routed
 this.Strength = function() { 
	 if(routed) return 0
	 return soldiers }
}

// TODO: unit as array, to allow for routed (defeated, fleeing) armies and non-routed ones?!
function Army(unit, area, owner)
{
	this.unit = unit
	this.area = area
	this.order = "Stand around idly"
	this.owner = owner
}

Army.prototype.toString = function armyToString() {
	  var ret = "Army of " + this.owner + " at " + this.area.Name + " with " + this.unit.soldiers + " soldiers, planning to " + this.order  
	  if(this.unit.routed)
		  ret = ret + ". The bastards have fled..."
	  return ret;
	}

function AssignOrdersTurn(armies) 
{
	this.armies = armies
	this.AllAssigned = function()
	{
		// TODO: check all orders non-zero
		return true;
	}
	
}

// Round one init
var armies = [new Army(new Unit(2, false), areas[0], "Player1"), new Army(new Unit(2, false), areas[2], "Player2")]
alert("Init board:\n" + armies.join("\n"))

var round1Turn1 = new AssignOrdersTurn(armies)



armies[0].order = "Attack" // 5 = attack..
armies[1].order = "Attack"

alert("Assigned orders:\n" + armies.join("\n"))

	
function ExecuteOrdersTurn(armies)
{
	this.armies = armies
	
	this.GetNextOrder = function() 
	{
		// check combat active
		
		// check armies orders
			// first flee (defeated armies)
			// Then next attacks
	}
	
	// todo: extend so multiple units can be send to different areas.
	this.StartAttack = function(army, attack_unit, attack_area)
	{
		// check if move valid?
		
		// for now, just attack

		// remove attacker army from list
		var index= this.armies.indexOf(army)
		this.armies.splice(index, 1)
		
		// TODO: support etc.
		
		
		var armyUnderAttack;
		
		for ( var aArmy in armies) {
			if(this.armies[aArmy].area == attack_area)
				{ 
				armyUnderAttack = this.armies[aArmy];
				console.log("enemy found: " + armyUnderAttack.unit.owner)
				}
				
		}
		
		if(armyUnderAttack)
			{
			// check owner (merge if it equals attacker).
				if(armyUnderAttack.unit.Strength() < attack_unit.Strength())
					{
						// defeat;
					    // TODO: flee (add flee from attack order to army, can not flee to where it was attacked from
						var index= this.armies.indexOf(armyUnderAttack)
						this.armies.splice(index, 1)
						// and conquer
						console.log(army.unit.owner + " conquered: "  + attack_area.Name)
						this.armies.push(new Army(attack_unit, attack_area, army.owner))
					}
				else
					{
						// TODO: reteat to source
					
					}
			}
		else
			{
				// invade:
				// if units remain in old area, create new army 
				// in old area
				// create new army in attacked area
				this.armies.push(new Army(attack_unit, attack_area, army.owner))
				
				if(army.unit.soldiers > attack_unit.soldiers)
					this.armies.push(new Army(new Unit(army.unit.soldiers - attack_unit.soldiers, false), army.area, army.owner));
			
			}
	}
}

var round1Phase2 = new ExecuteOrdersTurn(armies)

round1Phase2.StartAttack(armies[1], new Unit(1, false), areas[1])

for ( var army in armies) {
	//alert(armies.join("\n"))
}
alert("After attack 1:\n" + armies.join("\n"))

round1Phase2.StartAttack(armies[0], new Unit(2, false), areas[1])
alert("After attack 2:\n" + armies.join("\n"))
