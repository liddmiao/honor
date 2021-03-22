interface myFn {
  ( nm: string, nm1: number ): string
}

let fn:myFn

fn = function(name, nm) {
  return name + nm
}

fn('2',2)