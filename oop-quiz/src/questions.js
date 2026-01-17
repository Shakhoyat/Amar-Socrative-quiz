export const questions = [
  // ==================== VALUE vs REFERENCE SEMANTICS - TRICKY TRAPS (1-25) ====================
  {
    id: 1, diff: 'easy', cat: 'Value/Ref',
    q: 'What prints?\nint x=5; int y=x; y=17;\nSystem.out.println(x);',
    opts: ['5', '17', '22', 'Compilation Error'],
    ans: 0,
    exp: '🎯 TRAP: Primitives use VALUE semantics. y=x COPIES the value 5 into y. y and x are INDEPENDENT. Changing y to 17 doesn\'t affect x. x remains 5.'
  },
  {
    id: 2, diff: 'easy', cat: 'Value/Ref',
    q: 'What prints?\nint[] a={4,15}; int[] b=a;\nb[0]=7;\nSystem.out.println(a[0]);',
    opts: ['4', '7', '15', 'Compilation Error'],
    ans: 1,
    exp: '🎯 TRAP: Arrays are OBJECTS - use REFERENCE semantics! b=a makes both point to SAME array. Modifying b[0] changes the shared array. Output: 7'
  },
  {
    id: 3, diff: 'medium', cat: 'Value/Ref',
    q: 'Why doesn\'t swap work?\nvoid swap(int a, int b) {\n  int t=a; a=b; b=t;\n}',
    opts: ['Missing return statement', 'Java is pass-by-value, params are copies', 'Syntax error in method', 'It works correctly'],
    ans: 1,
    exp: '🎯 KEY CONCEPT: Java is ALWAYS pass-by-value. For primitives, method receives COPIES. Swapping copies doesn\'t affect originals!'
  },
  {
    id: 4, diff: 'hard', cat: 'Value/Ref',
    q: 'What prints?\nint[] a={1,2};\nchange(a);\nSystem.out.println(a[0]);\n\nvoid change(int[] x){x=new int[]{9};}',
    opts: ['1', '9', '0', 'NullPointerException'],
    ans: 0,
    exp: '🎯 CLASSIC TRAP: x is a COPY of the reference. Reassigning x to new array doesn\'t affect original reference a. a[0] still = 1!'
  },
  {
    id: 5, diff: 'hard', cat: 'Value/Ref',
    q: 'What prints?\nint[] a={1,2};\nmodify(a);\nSystem.out.println(a[0]);\n\nvoid modify(int[] x){x[0]=99;}',
    opts: ['1', '99', '0', 'ArrayIndexOutOfBoundsException'],
    ans: 1,
    exp: '🎯 DIFFERENCE: x is copy of reference but POINTS TO SAME ARRAY. Modifying x[0] changes the actual array. Output: 99'
  },
  {
    id: 6, diff: 'medium', cat: 'Value/Ref',
    q: 'String s1="hello"; String s2=s1;\ns2="world";\nSystem.out.println(s1);',
    opts: ['hello', 'world', 'helloworld', 'null'],
    ans: 0,
    exp: '🎯 TRAP: Strings are IMMUTABLE! s2="world" creates NEW String object. s1 still references original "hello".'
  },
  {
    id: 7, diff: 'hard', cat: 'Value/Ref',
    q: 'Integer a = 100; Integer b = 100;\nSystem.out.println(a == b);',
    opts: ['true', 'false', 'Compilation Error', 'NullPointerException'],
    ans: 0,
    exp: '🎯 INTERVIEW FAVORITE: Java caches Integer -128 to 127. Both reference SAME cached object. == returns true!'
  },
  {
    id: 8, diff: 'hard', cat: 'Value/Ref',
    q: 'Integer a = 200; Integer b = 200;\nSystem.out.println(a == b);',
    opts: ['true', 'false', 'Compilation Error', 'Depends on JVM'],
    ans: 1,
    exp: '🎯 GOTCHA: 200 is OUTSIDE cache range (-128 to 127). Different objects created. == compares references = false! Use .equals() for values.'
  },
  {
    id: 9, diff: 'medium', cat: 'Value/Ref',
    q: 'void test(Object o) { o = null; }\nString s = "hi"; test(s);\nSystem.out.println(s);',
    opts: ['null', 'hi', 'NullPointerException', 'Compilation Error'],
    ans: 1,
    exp: '🎯 TRAP: o is COPY of reference. Setting o to null doesn\'t affect original reference s. s still points to "hi".'
  },
  {
    id: 10, diff: 'hard', cat: 'Value/Ref',
    q: 'StringBuilder sb1 = new StringBuilder("A");\nStringBuilder sb2 = sb1;\nsb1.append("B");\nSystem.out.println(sb2);',
    opts: ['A', 'AB', 'B', 'Compilation Error'],
    ans: 1,
    exp: '🎯 KEY: StringBuilder is MUTABLE (unlike String). sb1 and sb2 reference SAME object. append() modifies shared object. Output: AB'
  },
  {
    id: 11, diff: 'medium', cat: 'Value/Ref',
    q: 'double d = 5;\nSystem.out.println(d);',
    opts: ['5', '5.0', 'Compilation Error', 'ClassCastException'],
    ans: 1,
    exp: '🎯 WIDENING CONVERSION: int 5 automatically converts to double 5.0. Safe, implicit conversion from smaller to larger type.'
  },
  {
    id: 12, diff: 'medium', cat: 'Value/Ref',
    q: 'int x = 5.5;',
    opts: ['x = 5', 'x = 6 (rounds up)', 'Compilation Error', 'x = 5.5'],
    ans: 2,
    exp: '🎯 NARROWING CONVERSION: double to int requires EXPLICIT cast. Compiler error! Must use: int x = (int)5.5; which gives 5 (truncates).'
  },
  {
    id: 13, diff: 'hard', cat: 'Value/Ref',
    q: 'int[] a = {1,2,3};\nint[] b = a.clone();\nb[0] = 99;\nSystem.out.println(a[0]);',
    opts: ['1', '99', '0', 'CloneNotSupportedException'],
    ans: 0,
    exp: '🎯 SHALLOW COPY: clone() creates NEW array with COPIED values for primitives. Modifying b doesn\'t affect a. a[0] = 1'
  },
  {
    id: 14, diff: 'hard', cat: 'Value/Ref',
    q: 'Point[] a = {new Point(1,2)};\nPoint[] b = a.clone();\nb[0].x = 99;\nSystem.out.println(a[0].x);',
    opts: ['1', '99', '0', 'NullPointerException'],
    ans: 1,
    exp: '🎯 SHALLOW COPY TRAP: clone() copies REFERENCES not objects! a[0] and b[0] point to SAME Point. Output: 99'
  },
  {
    id: 15, diff: 'easy', cat: 'Value/Ref',
    q: 'Which are primitive types in Java?',
    opts: ['String, int, double, boolean', 'int, double, boolean, char', 'Integer, Double, Boolean', 'int, String, Object'],
    ans: 1,
    exp: '🎯 FUNDAMENTAL: 8 primitives: byte, short, int, long, float, double, boolean, char. String is an OBJECT, not primitive!'
  },
  {
    id: 16, diff: 'medium', cat: 'Value/Ref',
    q: 'What is autoboxing?',
    opts: ['Converting String to int', 'Automatic primitive to wrapper conversion', 'Casting objects', 'Creating arrays'],
    ans: 1,
    exp: '🎯 AUTOBOXING: Automatic conversion primitive → wrapper (int → Integer). UNBOXING is reverse: Integer → int. Happens automatically.'
  },
  {
    id: 17, diff: 'hard', cat: 'Value/Ref',
    q: 'Integer x = null;\nint y = x;',
    opts: ['y = 0', 'y = null', 'NullPointerException', 'Compilation Error'],
    ans: 2,
    exp: '🎯 UNBOXING TRAP: Unboxing null Integer causes NullPointerException at RUNTIME! Common interview bug to spot.'
  },
  {
    id: 18, diff: 'hard', cat: 'Value/Ref',
    q: 'String s1 = "hello";\nString s2 = "hello";\nSystem.out.println(s1 == s2);',
    opts: ['true', 'false', 'Depends on JVM', 'Compilation Error'],
    ans: 0,
    exp: '🎯 STRING POOL: String literals are INTERNED (pooled). Same literal = same object in pool. == is true! But use .equals() for safety.'
  },
  {
    id: 19, diff: 'hard', cat: 'Value/Ref',
    q: 'String s1 = "hello";\nString s2 = new String("hello");\nSystem.out.println(s1 == s2);',
    opts: ['true', 'false', 'Depends', 'NullPointerException'],
    ans: 1,
    exp: '🎯 INTERVIEW TRAP: "new String()" bypasses pool, creates NEW object. Different objects = false! Always use .equals() for String comparison.'
  },
  {
    id: 20, diff: 'hard', cat: 'Value/Ref',
    q: 'String s1 = "hello";\nString s2 = new String("hello").intern();\nSystem.out.println(s1 == s2);',
    opts: ['true', 'false', 'Compilation Error', 'Depends'],
    ans: 0,
    exp: '🎯 INTERN: intern() returns reference from String pool. s2 now references same pooled "hello" as s1. == is true!'
  },
  {
    id: 21, diff: 'medium', cat: 'Value/Ref',
    q: 'What\'s the difference between == and .equals()?',
    opts: ['Same thing', '== for values, .equals() for references', '== for references, .equals() for content', 'equals() is faster'],
    ans: 2,
    exp: '🎯 FUNDAMENTAL: == compares REFERENCES (memory addresses). .equals() compares CONTENT/STATE. For objects, always use .equals()!'
  },
  {
    id: 22, diff: 'hard', cat: 'Value/Ref',
    q: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};\nSystem.out.println(arr1.equals(arr2));',
    opts: ['true', 'false', 'Compilation Error', 'Depends'],
    ans: 1,
    exp: '🎯 TRAP: Arrays don\'t override equals()! Uses Object.equals() which is ==. Different arrays = false! Use Arrays.equals() instead.'
  },
  {
    id: 23, diff: 'medium', cat: 'Value/Ref',
    q: 'What does System.out.println(new int[]{1,2,3}); print?',
    opts: ['[1, 2, 3]', '{1, 2, 3}', '[I@someHex', 'Compilation Error'],
    ans: 2,
    exp: '🎯 TRAP: Arrays don\'t override toString()! Prints type code + hashcode like [I@1a2b3c. Use Arrays.toString() for readable output.'
  },
  {
    id: 24, diff: 'hard', cat: 'Value/Ref',
    q: 'List<Integer> list = new ArrayList<>();\nlist.add(1); list.add(2); list.add(3);\nlist.remove(1);\nSystem.out.println(list);',
    opts: ['[2, 3]', '[1, 3]', '[1, 2]', 'Compilation Error'],
    ans: 1,
    exp: '🎯 OVERLOADING TRAP: remove(int) removes by INDEX, not value! remove(1) removes element at index 1. Output: [1, 3]. Use remove(Integer.valueOf(1)) for value.'
  },
  {
    id: 25, diff: 'hard', cat: 'Value/Ref',
    q: 'What\'s printed?\nObject obj = "hello";\nString str = (String) obj;\nSystem.out.println(str.length());',
    opts: ['5', 'ClassCastException', 'Compilation Error', 'NullPointerException'],
    ans: 0,
    exp: '🎯 SAFE CAST: obj actually IS a String. Downcast succeeds. str.length() = 5. Cast fails only if actual type isn\'t compatible.'
  },

  // ==================== CLASSES & OBJECTS - TRICKY CONCEPTS (26-55) ====================
  {
    id: 26, diff: 'easy', cat: 'Classes',
    q: 'What is a class in OOP?',
    opts: ['An instance of object', 'Blueprint/template for creating objects', 'A method that creates objects', 'Same as object'],
    ans: 1,
    exp: '🎯 FUNDAMENTAL: Class = BLUEPRINT defining what objects look like (fields) and do (methods). Objects are INSTANCES of classes.'
  },
  {
    id: 27, diff: 'easy', cat: 'Classes',
    q: 'What is an object in OOP?',
    opts: ['Same as class', 'Template for creating classes', 'Instance with state and behavior', 'A variable'],
    ans: 2,
    exp: '🎯 FUNDAMENTAL: Object = INSTANCE of class with STATE (field values) and BEHAVIOR (methods). Created using "new" keyword.'
  },
  {
    id: 28, diff: 'easy', cat: 'Classes',
    q: 'How to create an object in Java?',
    opts: ['Object.create()', 'new ClassName()', 'ClassName.new()', 'create ClassName'],
    ans: 1,
    exp: '🎯 SYNTAX: Type varName = new Type(args); The "new" keyword allocates memory and calls constructor.'
  },
  {
    id: 29, diff: 'medium', cat: 'Classes',
    q: 'Point p;\np.setLocation(5, 3);',
    opts: ['Sets location to (5,3)', 'NullPointerException', 'Compilation Error', 'Creates new Point'],
    ans: 1,
    exp: '🎯 TRAP: p is DECLARED but not INITIALIZED (null by default). Calling method on null → NullPointerException at RUNTIME!'
  },
  {
    id: 30, diff: 'easy', cat: 'Classes',
    q: 'Default value of int instance variable?',
    opts: ['null', '0', '-1', 'undefined'],
    ans: 1,
    exp: '🎯 DEFAULTS: Numeric fields → 0 (or 0.0). boolean → false. Object references → null. Local variables have NO defaults!'
  },
  {
    id: 31, diff: 'medium', cat: 'Classes',
    q: 'Default value of local variable?',
    opts: ['0', 'null', 'No default - must initialize', 'false'],
    ans: 2,
    exp: '🎯 TRAP: Local variables have NO default values! Must initialize before use or compiler error. Instance variables have defaults.'
  },
  {
    id: 32, diff: 'hard', cat: 'Classes',
    q: 'class A { int x = 5; A() { x = 10; } }\nWhat is x after new A()?',
    opts: ['0', '5', '10', 'Compilation Error'],
    ans: 2,
    exp: '🎯 INITIALIZATION ORDER: 1) Default value (0), 2) Field initializer (x=5), 3) Constructor body (x=10). Final value: 10'
  },
  {
    id: 33, diff: 'hard', cat: 'Classes',
    q: 'class A { int x; void m() { int x = 5; System.out.println(x); } }\nWhat prints?',
    opts: ['0', '5', 'Compilation Error', 'null'],
    ans: 1,
    exp: '🎯 SHADOWING: Local variable x SHADOWS field x. Inside method, x refers to local (5). Use this.x to access field.'
  },
  {
    id: 34, diff: 'medium', cat: 'Classes',
    q: 'class A { private int x; }\nclass B { void m(A a1, A a2) { a1.x = a2.x; } }',
    opts: ['Works fine', 'Compilation Error - x is private', 'Runtime Error', 'Works only in same package'],
    ans: 1,
    exp: '🎯 PRIVATE: private members only accessible WITHIN the same class. B cannot access A\'s private field x.'
  },
  {
    id: 35, diff: 'hard', cat: 'Classes',
    q: 'class A { private int x; void m(A other) { this.x = other.x; } }',
    opts: ['Compilation Error', 'Works fine', 'Runtime Error', 'Works only if same object'],
    ans: 1,
    exp: '🎯 INTERVIEW TRAP: Private is PER CLASS not per object! Code in class A can access private fields of ANY A instance.'
  },
  {
    id: 36, diff: 'medium', cat: 'Classes',
    q: 'How many objects can be created from one class?',
    opts: ['Only 1', 'Maximum 100', 'Unlimited (limited by memory)', 'Must specify in class'],
    ans: 2,
    exp: '🎯 FUNDAMENTAL: Unlimited objects from one class (limited only by memory). Each object is independent with own state.'
  },
  {
    id: 37, diff: 'easy', cat: 'Classes',
    q: 'What does "this" keyword refer to?',
    opts: ['The class', 'The current object', 'The parent object', 'Static context'],
    ans: 1,
    exp: '🎯 FUNDAMENTAL: "this" refers to the CURRENT OBJECT (implicit parameter). Used to access instance members and distinguish from parameters.'
  },
  {
    id: 38, diff: 'medium', cat: 'Classes',
    q: 'Can "this" be used in static method?',
    opts: ['Yes, always', 'No - no object context', 'Only in main()', 'Only with super'],
    ans: 1,
    exp: '🎯 TRAP: Static methods belong to CLASS, not objects. No implicit object → no "this". Cannot access instance members directly.'
  },
  {
    id: 39, diff: 'hard', cat: 'Classes',
    q: 'A a = null;\na.staticMethod();',
    opts: ['NullPointerException', 'Works fine', 'Compilation Error', 'Undefined behavior'],
    ans: 1,
    exp: '🎯 SURPRISE: Static methods use CLASS, not object! null reference is ignored. Equivalent to A.staticMethod(). Bad practice but works!'
  },
  {
    id: 40, diff: 'medium', cat: 'Classes',
    q: 'Difference between instance and static variable?',
    opts: ['No difference', 'Instance per object, static per class', 'Static per object', 'Instance is faster'],
    ans: 1,
    exp: '🎯 KEY: Instance variable = each object has OWN copy. Static variable = ONE copy shared by ALL objects of the class.'
  },
  {
    id: 41, diff: 'hard', cat: 'Classes',
    q: 'class Counter { static int count = 0; Counter() { count++; } }\nnew Counter(); new Counter(); new Counter();\nSystem.out.println(Counter.count);',
    opts: ['0', '1', '3', 'Compilation Error'],
    ans: 2,
    exp: '🎯 STATIC: count is SHARED. Each constructor increments the SAME variable. After 3 objects: count = 3'
  },
  {
    id: 42, diff: 'medium', cat: 'Classes',
    q: 'Can a class have both static and instance methods?',
    opts: ['No, must choose one', 'Yes', 'Only abstract classes', 'Only final classes'],
    ans: 1,
    exp: '🎯 YES: Classes commonly have both. Static for class-level operations, instance for object-specific behavior.'
  },
  {
    id: 43, diff: 'hard', cat: 'Classes',
    q: 'class A { int x = getY(); int getY() { return 5; } }',
    opts: ['x = 5', 'Compilation Error', 'x = 0', 'NullPointerException'],
    ans: 0,
    exp: '🎯 VALID: Methods can be called during field initialization. getY() returns 5, so x = 5. Order matters though!'
  },
  {
    id: 44, diff: 'hard', cat: 'Classes',
    q: 'class A { int x = y; int y = 5; }',
    opts: ['x = 5', 'x = 0', 'Compilation Error - forward reference', 'Runtime Error'],
    ans: 2,
    exp: '🎯 TRAP: Cannot use field before its declaration in initialization! Forward reference causes compilation error.'
  },
  {
    id: 45, diff: 'medium', cat: 'Classes',
    q: 'What is a utility class?',
    opts: ['Class with only instance methods', 'Class with only static methods, private constructor', 'Abstract class', 'Interface'],
    ans: 1,
    exp: '🎯 UTILITY CLASS: Only static methods, private constructor (no instances). Examples: Math, Arrays, Collections.'
  },
  {
    id: 46, diff: 'easy', cat: 'Classes',
    q: 'What is object state?',
    opts: ['Its methods', 'Current values of its fields', 'Its class name', 'Its memory address'],
    ans: 1,
    exp: '🎯 STATE: The current VALUES of all instance variables. State can change over object\'s lifetime.'
  },
  {
    id: 47, diff: 'easy', cat: 'Classes',
    q: 'What is object behavior?',
    opts: ['Its fields', 'Actions it can perform (methods)', 'Its constructor', 'Its state'],
    ans: 1,
    exp: '🎯 BEHAVIOR: Defined by methods - what the object CAN DO. Behavior may depend on or modify state.'
  },
  {
    id: 48, diff: 'easy', cat: 'Classes',
    q: 'What is object identity?',
    opts: ['Its state', 'Unique memory address', 'Its class', 'Its hashCode'],
    ans: 1,
    exp: '🎯 IDENTITY: What makes each object UNIQUE - its memory address. Two objects with same state have different identities.'
  },
  {
    id: 49, diff: 'hard', cat: 'Classes',
    q: 'static { System.out.println("Static"); }\n{ System.out.println("Instance"); }\nA() { System.out.println("Constructor"); }',
    opts: ['Static, Instance, Constructor', 'Constructor, Instance, Static', 'Instance, Constructor, Static', 'Static, Constructor, Instance'],
    ans: 0,
    exp: '🎯 ORDER: 1) Static block (once at class load), 2) Instance initializer, 3) Constructor body. Each new A() prints Instance then Constructor.'
  },
  {
    id: 50, diff: 'hard', cat: 'Classes',
    q: 'When does static initializer run?',
    opts: ['When object created', 'When class first loaded', 'At program start', 'When main() called'],
    ans: 1,
    exp: '🎯 STATIC INIT: Runs ONCE when class is first LOADED (first use of class). Before any objects created or static methods called.'
  },
  {
    id: 51, diff: 'medium', cat: 'Classes',
    q: 'Can a file have multiple public classes?',
    opts: ['Yes, unlimited', 'No, only one public class', 'Only in default package', 'Yes, with different names'],
    ans: 1,
    exp: '🎯 RULE: Only ONE public class per file, and filename must match that class name. Can have multiple non-public classes.'
  },
  {
    id: 52, diff: 'hard', cat: 'Classes',
    q: 'class Outer { class Inner {} }\nHow to create Inner from outside?',
    opts: ['new Inner()', 'new Outer.Inner()', 'new Outer().new Inner()', 'Outer.Inner.create()'],
    ans: 2,
    exp: '🎯 INNER CLASS: Non-static inner class needs OUTER INSTANCE. Must create outer first: new Outer().new Inner()'
  },
  {
    id: 53, diff: 'hard', cat: 'Classes',
    q: 'class Outer { static class Nested {} }\nHow to create Nested?',
    opts: ['new Outer().new Nested()', 'new Outer.Nested()', 'new Nested()', 'Outer.new Nested()'],
    ans: 1,
    exp: '🎯 STATIC NESTED: Doesn\'t need outer instance. Create directly: new Outer.Nested(). No access to outer\'s instance members.'
  },
  {
    id: 54, diff: 'hard', cat: 'Classes',
    q: 'Can inner class access outer class\'s private members?',
    opts: ['No, private is private', 'Yes, inner has full access', 'Only protected', 'Only through getters'],
    ans: 1,
    exp: '🎯 INNER ACCESS: Non-static inner class has FULL access to ALL outer class members, including PRIVATE!'
  },
  {
    id: 55, diff: 'medium', cat: 'Classes',
    q: 'What is the implicit parameter?',
    opts: ['First explicit argument', 'The object method is called on', 'Return value', 'Static context'],
    ans: 1,
    exp: '🎯 IMPLICIT PARAM: The object on which method is invoked (before the dot). Accessed via "this" keyword.'
  },

  // ==================== ENCAPSULATION - INTERVIEW FAVORITES (56-75) ====================
  {
    id: 56, diff: 'easy', cat: 'Encapsulation',
    q: 'What is encapsulation?',
    opts: ['Inheritance', 'Hiding implementation details, exposing interface', 'Creating objects', 'Method overloading'],
    ans: 1,
    exp: '🎯 ENCAPSULATION: HIDE internal details, EXPOSE clean interface. Separate WHAT from HOW. Protects object integrity.'
  },
  {
    id: 57, diff: 'easy', cat: 'Encapsulation',
    q: 'Should fields be public or private?',
    opts: ['Public for convenience', 'Private to protect data', 'Doesn\'t matter', 'Protected always'],
    ans: 1,
    exp: '🎯 BEST PRACTICE: Fields should be PRIVATE. Control access through methods (getters/setters). This is encapsulation!'
  },
  {
    id: 58, diff: 'easy', cat: 'Encapsulation',
    q: 'What does "private" mean?',
    opts: ['Accessible everywhere', 'Only within same class', 'Within package', 'Only subclasses'],
    ans: 1,
    exp: '🎯 PRIVATE: Accessible ONLY within the SAME CLASS. Not visible to other classes, subclasses, or outside package.'
  },
  {
    id: 59, diff: 'easy', cat: 'Encapsulation',
    q: 'What does "public" mean?',
    opts: ['Same class only', 'Same package only', 'Accessible from ANYWHERE', 'Subclasses only'],
    ans: 2,
    exp: '🎯 PUBLIC: Accessible from ANY class in ANY package. Widest visibility.'
  },
  {
    id: 60, diff: 'medium', cat: 'Encapsulation',
    q: 'What is default (package-private) access?',
    opts: ['Same as public', 'Same as private', 'Same package only, no keyword', 'Subclasses only'],
    ans: 2,
    exp: '🎯 DEFAULT: No access modifier = package-private. Accessible only within SAME PACKAGE. Not in subclasses outside package.'
  },
  {
    id: 61, diff: 'medium', cat: 'Encapsulation',
    q: 'What is "protected" access?',
    opts: ['Same class only', 'Same package OR subclasses anywhere', 'Only subclasses', 'Public in subclass'],
    ans: 1,
    exp: '🎯 PROTECTED: Same package + ALL subclasses (even in different packages). More permissive than default.'
  },
  {
    id: 62, diff: 'hard', cat: 'Encapsulation',
    q: 'Access order from most to least restrictive?',
    opts: ['public, protected, default, private', 'private, default, protected, public', 'private, protected, default, public', 'protected, private, default, public'],
    ans: 1,
    exp: '🎯 ORDER: private (class) → default (package) → protected (package+subclass) → public (all). Remember: private < default < protected < public'
  },
  {
    id: 63, diff: 'hard', cat: 'Encapsulation',
    q: 'class A { private int[] data; public int[] getData() { return data; } }\nGood encapsulation?',
    opts: ['Yes, field is private', 'No, exposes mutable array', 'Yes, getter is fine', 'Depends on usage'],
    ans: 1,
    exp: '🎯 ENCAPSULATION LEAK: Returning array reference exposes internal state! Client can modify data. Should return data.clone().'
  },
  {
    id: 64, diff: 'hard', cat: 'Encapsulation',
    q: 'class A { private Date date; public void setDate(Date d) { this.date = d; } }\nGood encapsulation?',
    opts: ['Yes, setter is fine', 'No, caller keeps reference to mutable Date', 'Yes, date is private', 'Only if Date is final'],
    ans: 1,
    exp: '🎯 TRAP: Caller keeps reference to same Date object! Can modify it outside class. Should: this.date = new Date(d.getTime());'
  },
  {
    id: 65, diff: 'medium', cat: 'Encapsulation',
    q: 'Why use getters instead of public fields?',
    opts: ['No reason', 'Validation, computed values, future changes', 'Faster execution', 'Required by Java'],
    ans: 1,
    exp: '🎯 BENEFITS: 1) Validation 2) Computed/derived values 3) Lazy loading 4) Change implementation later without breaking clients.'
  },
  {
    id: 66, diff: 'easy', cat: 'Encapsulation',
    q: 'What is an accessor method?',
    opts: ['Modifies state', 'Returns field value without changing state', 'Creates objects', 'Static method'],
    ans: 1,
    exp: '🎯 ACCESSOR (getter): Returns field value, NO side effects. Usually: getFieldName() or isFieldName() for boolean.'
  },
  {
    id: 67, diff: 'easy', cat: 'Encapsulation',
    q: 'What is a mutator method?',
    opts: ['Returns value', 'Modifies object state', 'Creates copies', 'Static method'],
    ans: 1,
    exp: '🎯 MUTATOR (setter): Changes field value. Usually void, named setFieldName(value). Can include validation.'
  },
  {
    id: 68, diff: 'medium', cat: 'Encapsulation',
    q: 'What is a class invariant?',
    opts: ['Final field', 'Condition that must always be true for valid state', 'Static variable', 'Constructor'],
    ans: 1,
    exp: '🎯 INVARIANT: Property that MUST be true for valid objects. Example: age >= 0. Encapsulation helps maintain invariants through validation.'
  },
  {
    id: 69, diff: 'medium', cat: 'Encapsulation',
    q: 'Should constructor be public?',
    opts: ['Always yes', 'Usually yes, sometimes private', 'Always no', 'Only in abstract classes'],
    ans: 1,
    exp: '🎯 USUALLY PUBLIC, but private for: Singleton pattern, factory methods, utility classes (no instances), builder pattern.'
  },
  {
    id: 70, diff: 'hard', cat: 'Encapsulation',
    q: 'What is Singleton pattern?',
    opts: ['One method per class', 'Only ONE instance of class allowed', 'Single inheritance', 'One field per class'],
    ans: 1,
    exp: '🎯 SINGLETON: Private constructor + static getInstance() returning same instance. Ensures only ONE object of class exists.'
  },
  {
    id: 71, diff: 'hard', cat: 'Encapsulation',
    q: 'class Counter { private static Counter instance; private Counter() {} public static Counter getInstance() { if(instance==null) instance=new Counter(); return instance; } }\nThread-safe?',
    opts: ['Yes', 'No, race condition possible', 'Yes if volatile', 'Depends on JVM'],
    ans: 1,
    exp: '🎯 NOT THREAD-SAFE: Two threads could both see null and create two instances! Need synchronized or eager initialization.'
  },
  {
    id: 72, diff: 'medium', cat: 'Encapsulation',
    q: 'What modifier order is conventional?',
    opts: ['static public final', 'public static final', 'final public static', 'Any order'],
    ans: 1,
    exp: '🎯 CONVENTION: access, static, final, type. Example: public static final int MAX = 100; Compiler accepts any order but convention matters!'
  },
  {
    id: 73, diff: 'hard', cat: 'Encapsulation',
    q: 'Immutable class requirements?',
    opts: ['Just final class', 'Final class, private fields, no setters, defensive copies', 'Private constructor only', 'All fields final'],
    ans: 1,
    exp: '🎯 IMMUTABLE: 1) Final class 2) All fields private final 3) No setters 4) Defensive copies in constructor and getters for mutable fields.'
  },
  {
    id: 74, diff: 'hard', cat: 'Encapsulation',
    q: 'Why is String immutable?',
    opts: ['Easier to code', 'Thread-safety, caching, security', 'Performance only', 'No reason'],
    ans: 1,
    exp: '🎯 STRING IMMUTABLE: 1) Thread-safe 2) String pool caching 3) Security (parameters can\'t be modified) 4) HashCode caching.'
  },
  {
    id: 75, diff: 'medium', cat: 'Encapsulation',
    q: 'Can final field be modified?',
    opts: ['Yes, anytime', 'No, only set once', 'Only in constructor', 'Only with reflection'],
    ans: 2,
    exp: '🎯 FINAL: Must be initialized exactly ONCE - either at declaration or in constructor. Cannot be changed after.'
  },

  // ==================== METHODS - OVERLOADING TRAPS (76-100) ====================
  {
    id: 76, diff: 'easy', cat: 'Methods',
    q: 'What is method overloading?',
    opts: ['Same name in subclass', 'Same name, DIFFERENT parameters', 'Different name, same params', 'Recursive methods'],
    ans: 1,
    exp: '🎯 OVERLOADING: Multiple methods with SAME NAME but DIFFERENT PARAMETER LIST (type, number, or order). Resolved at COMPILE time.'
  },
  {
    id: 77, diff: 'medium', cat: 'Methods',
    q: 'Can overloaded methods differ ONLY by return type?',
    opts: ['Yes', 'No, must differ by parameters', 'Only for static methods', 'Only for void methods'],
    ans: 1,
    exp: '🎯 RULE: Return type is NOT part of signature. Methods must differ by PARAMETERS. Different return type alone = compilation error.'
  },
  {
    id: 78, diff: 'hard', cat: 'Methods',
    q: 'void m(int x) {} and void m(double x) {}\nm(5) calls which?',
    opts: ['int version', 'double version', 'Ambiguous - error', 'Random'],
    ans: 0,
    exp: '🎯 MOST SPECIFIC: Compiler picks most specific match. int literal 5 matches int exactly, so int version called.'
  },
  {
    id: 79, diff: 'hard', cat: 'Methods',
    q: 'void m(int x, double y) {} and void m(double x, int y) {}\nm(5, 5) calls which?',
    opts: ['First version', 'Second version', 'Ambiguous - compilation error', 'Both versions'],
    ans: 2,
    exp: '🎯 AMBIGUITY: Both methods equally applicable for (int, int). Compiler cannot decide. COMPILATION ERROR!'
  },
  {
    id: 80, diff: 'hard', cat: 'Methods',
    q: 'void m(Integer x) {} and void m(int x) {}\nm(5) calls which?',
    opts: ['Integer version', 'int version', 'Ambiguous', 'Random'],
    ans: 1,
    exp: '🎯 AUTOBOXING RULE: Primitives prefer primitive overload before considering autoboxing. int version called.'
  },
  {
    id: 81, diff: 'hard', cat: 'Methods',
    q: 'void m(Object o) {} and void m(String s) {}\nm(null) calls which?',
    opts: ['Object version', 'String version', 'Ambiguous - error', 'NullPointerException'],
    ans: 1,
    exp: '🎯 MOST SPECIFIC NULL: When null, compiler picks most SPECIFIC type. String is more specific than Object. String version called.'
  },
  {
    id: 82, diff: 'hard', cat: 'Methods',
    q: 'void m(String s) {} and void m(Integer i) {}\nm(null) calls which?',
    opts: ['String version', 'Integer version', 'Ambiguous - compilation error', 'Either one randomly'],
    ans: 2,
    exp: '🎯 AMBIGUOUS NULL: String and Integer are unrelated - neither more specific. COMPILATION ERROR! Must cast: m((String)null)'
  },
  {
    id: 83, diff: 'medium', cat: 'Methods',
    q: 'What is varargs?',
    opts: ['Variable names', 'Variable number of arguments (Type... name)', 'Variable return type', 'Variable class'],
    ans: 1,
    exp: '🎯 VARARGS: Type... name allows 0 or more arguments of that type. Treated as array inside method. Must be LAST parameter.'
  },
  {
    id: 84, diff: 'hard', cat: 'Methods',
    q: 'void m(int... nums) {}\nValid calls?',
    opts: ['Only m(1,2,3)', 'Only m(new int[]{})', 'm(), m(1), m(1,2,3), m(new int[]{1,2})', 'Only m() and m(1)'],
    ans: 2,
    exp: '🎯 VARARGS FLEXIBILITY: Can call with: no args, multiple args, or array. All valid: m(), m(1), m(1,2,3), m(new int[]{1,2})'
  },
  {
    id: 85, diff: 'hard', cat: 'Methods',
    q: 'void m(int x, int... nums) {}\nCan varargs be first parameter?',
    opts: ['Yes', 'No, must be last', 'Only if one parameter', 'Depends on type'],
    ans: 1,
    exp: '🎯 RULE: Varargs MUST be LAST parameter. Only ONE varargs per method. int... must come after all regular params.'
  },
  {
    id: 86, diff: 'medium', cat: 'Methods',
    q: 'void m(int[] arr) {} and void m(int... nums) {}\nSame signature?',
    opts: ['No, different', 'Yes, same signature!', 'Depends on call', 'Only in same class'],
    ans: 1,
    exp: '🎯 TRAP: Varargs IS an array! int... and int[] have SAME signature. Cannot have both - compilation error!'
  },
  {
    id: 87, diff: 'medium', cat: 'Methods',
    q: 'What is method signature?',
    opts: ['Full declaration', 'Name + parameter types (in order)', 'Name + return type', 'Name only'],
    ans: 1,
    exp: '🎯 SIGNATURE = Method name + parameter types in order. Return type, access modifiers NOT part of signature.'
  },
  {
    id: 88, diff: 'easy', cat: 'Methods',
    q: 'What does void return type mean?',
    opts: ['Returns 0', 'Returns null', 'Returns nothing', 'Compilation error'],
    ans: 2,
    exp: '🎯 VOID: Method returns NOTHING. Can use "return;" to exit early, but cannot return a value.'
  },
  {
    id: 89, diff: 'medium', cat: 'Methods',
    q: 'Non-void method without return statement?',
    opts: ['Returns null', 'Returns 0', 'Compilation Error', 'Runtime Error'],
    ans: 2,
    exp: '🎯 RULE: Non-void methods MUST return value on ALL execution paths. Missing return = compilation error.'
  },
  {
    id: 90, diff: 'hard', cat: 'Methods',
    q: 'int m() { if(true) return 1; }\nCompiles?',
    opts: ['Yes, always returns 1', 'No, compiler sees missing return path', 'Yes, condition is constant', 'Warning only'],
    ans: 1,
    exp: '🎯 TRAP: Compiler doesn\'t evaluate conditions! Sees possible path without return. COMPILATION ERROR. Need else return or return after if.'
  },
  {
    id: 91, diff: 'hard', cat: 'Methods',
    q: 'int m() { while(true) { return 1; } }\nCompiles?',
    opts: ['Yes', 'No, infinite loop', 'No, unreachable code', 'Warning only'],
    ans: 0,
    exp: '🎯 COMPILES: Compiler recognizes infinite loop with return covers all paths. Code AFTER the loop would be unreachable.'
  },
  {
    id: 92, diff: 'hard', cat: 'Methods',
    q: 'int m() { throw new RuntimeException(); }\nCompiles?',
    opts: ['No, missing return', 'Yes, exception terminates method', 'No, must be in try block', 'Warning only'],
    ans: 1,
    exp: '🎯 COMPILES: throw terminates method - no path returns normally. Compiler satisfied all paths handled.'
  },
  {
    id: 93, diff: 'medium', cat: 'Methods',
    q: 'What is recursion?',
    opts: ['Loop', 'Method calling itself', 'Overloading', 'Overriding'],
    ans: 1,
    exp: '🎯 RECURSION: Method calls ITSELF. Must have BASE CASE to terminate. Uses call stack - can cause StackOverflowError.'
  },
  {
    id: 94, diff: 'hard', cat: 'Methods',
    q: 'int f(int n) { return f(n-1); }\nf(5) does what?',
    opts: ['Returns 0', 'Returns 1', 'StackOverflowError', 'Returns 5'],
    ans: 2,
    exp: '🎯 NO BASE CASE: Infinite recursion! Each call makes another call. Stack fills up → StackOverflowError.'
  },
  {
    id: 95, diff: 'hard', cat: 'Methods',
    q: 'What is covariant return type?',
    opts: ['Same return type', 'Override can return SUBTYPE of original return type', 'Return supertype', 'Multiple returns'],
    ans: 1,
    exp: '🎯 COVARIANT: Override can return MORE SPECIFIC type. Animal clone() can be overridden as Dog clone(). Added in Java 5.'
  },
  {
    id: 96, diff: 'medium', cat: 'Methods',
    q: 'What is method chaining?',
    opts: ['Calling multiple methods', 'Methods returning "this" for obj.m1().m2().m3()', 'Inheritance chain', 'Overloading'],
    ans: 1,
    exp: '🎯 CHAINING: Each method returns "this" allowing chained calls. Example: builder.name("X").age(5).build()'
  },
  {
    id: 97, diff: 'easy', cat: 'Methods',
    q: 'Is Java pass-by-value or pass-by-reference?',
    opts: ['Pass-by-reference', 'Always pass-by-value', 'Primitives by value, objects by reference', 'Depends on type'],
    ans: 1,
    exp: '🎯 ALWAYS PASS-BY-VALUE: Primitives: copy of value. Objects: copy of REFERENCE (not copy of object). The reference itself is copied!'
  },
  {
    id: 98, diff: 'hard', cat: 'Methods',
    q: 'class A { static int count = 0; void m() { count++; } }\nIs this thread-safe?',
    opts: ['Yes', 'No, race condition', 'Yes, it\'s static', 'Depends on JVM'],
    ans: 1,
    exp: '🎯 NOT THREAD-SAFE: count++ is NOT atomic (read-modify-write). Multiple threads can interleave. Need synchronized or AtomicInteger.'
  },
  {
    id: 99, diff: 'hard', cat: 'Methods',
    q: 'What happens: m(m(m(5))) where int m(int x) { return x+1; }?',
    opts: ['Compilation error', '6', '7', '8'],
    ans: 3,
    exp: '🎯 NESTED CALLS: Innermost first. m(5)=6, m(6)=7, m(7)=8. Final result: 8'
  },
  {
    id: 100, diff: 'medium', cat: 'Methods',
    q: 'Can static method be overloaded?',
    opts: ['No', 'Yes', 'Only with instance methods', 'Only in subclass'],
    ans: 1,
    exp: '🎯 YES: Static methods CAN be overloaded (same name, different params). But cannot be OVERRIDDEN (just hidden).'
  },

  // ==================== CONSTRUCTORS - TRICKY SCENARIOS (101-125) ====================
  {
    id: 101, diff: 'easy', cat: 'Constructors',
    q: 'What is a constructor?',
    opts: ['Regular method', 'Special method to initialize new objects', 'Static method', 'Final method'],
    ans: 1,
    exp: '🎯 CONSTRUCTOR: Special method called automatically when object created with "new". Same name as class, NO return type.'
  },
  {
    id: 102, diff: 'easy', cat: 'Constructors',
    q: 'Does constructor have return type?',
    opts: ['Yes, void', 'Yes, the class type', 'No return type at all', 'Optional'],
    ans: 2,
    exp: '🎯 NO RETURN TYPE: Not even void! If you write void ClassName(), it becomes a regular METHOD, not constructor.'
  },
  {
    id: 103, diff: 'medium', cat: 'Constructors',
    q: 'class A { void A() {} }\nIs this a constructor?',
    opts: ['Yes', 'No, it\'s a method named A', 'Compilation error', 'Yes, void is optional'],
    ans: 1,
    exp: '🎯 TRAP: void A() is a REGULAR METHOD named A! Constructor has NO return type. This is a common mistake!'
  },
  {
    id: 104, diff: 'medium', cat: 'Constructors',
    q: 'When is default constructor provided?',
    opts: ['Always', 'Only if NO constructors written', 'Never', 'Only for public classes'],
    ans: 1,
    exp: '🎯 DEFAULT CONSTRUCTOR: Compiler provides no-arg constructor ONLY if you write NO constructors at all.'
  },
  {
    id: 105, diff: 'hard', cat: 'Constructors',
    q: 'class A { A(int x) {} }\nnew A(); // valid?',
    opts: ['Yes, uses default', 'No, compilation error', 'Yes, x defaults to 0', 'Runtime error'],
    ans: 1,
    exp: '🎯 TRAP: Once you write ANY constructor, default is NOT provided! No matching no-arg constructor → compilation error.'
  },
  {
    id: 106, diff: 'medium', cat: 'Constructors',
    q: 'Can class have multiple constructors?',
    opts: ['No', 'Yes, with different parameters (overloading)', 'Maximum 2', 'Only abstract classes'],
    ans: 1,
    exp: '🎯 CONSTRUCTOR OVERLOADING: Yes! Multiple constructors with different parameter lists. Same rules as method overloading.'
  },
  {
    id: 107, diff: 'medium', cat: 'Constructors',
    q: 'How to call another constructor in same class?',
    opts: ['super()', 'this()', 'new ClassName()', 'Constructor()'],
    ans: 1,
    exp: '🎯 this(): Calls another constructor in SAME class. Must be FIRST statement. Enables constructor chaining.'
  },
  {
    id: 108, diff: 'hard', cat: 'Constructors',
    q: 'A() { System.out.println("1"); this(5); }\nA(int x) { System.out.println("2"); }',
    opts: ['Prints 1, 2', 'Prints 2, 1', 'Compilation error - this() not first', 'Runtime error'],
    ans: 2,
    exp: '🎯 RULE: this() or super() MUST be FIRST statement in constructor. println before this() → compilation error!'
  },
  {
    id: 109, diff: 'hard', cat: 'Constructors',
    q: 'Can constructor have both this() and super()?',
    opts: ['Yes', 'No, only one as first statement', 'this() first, then super()', 'super() first, then this()'],
    ans: 1,
    exp: '🎯 RULE: Only ONE of this() OR super() can be first statement. Cannot have both. this() eventually calls super().'
  },
  {
    id: 110, diff: 'medium', cat: 'Constructors',
    q: 'Are constructors inherited?',
    opts: ['Yes, automatically', 'No, never inherited', 'Only public ones', 'Only default constructor'],
    ans: 1,
    exp: '🎯 CONSTRUCTORS NOT INHERITED: Each class defines its own constructors. Child cannot use "new Child()" with parent\'s constructor params.'
  },
  {
    id: 111, diff: 'medium', cat: 'Constructors',
    q: 'How to call parent constructor?',
    opts: ['parent()', 'super()', 'base()', 'Parent()'],
    ans: 1,
    exp: '🎯 super(): Calls parent class constructor. Must be FIRST statement if explicit. Implicit super() added if not specified.'
  },
  {
    id: 112, diff: 'hard', cat: 'Constructors',
    q: 'class A { A(int x) {} }\nclass B extends A {}\nCompiles?',
    opts: ['Yes', 'No, B needs explicit constructor', 'Yes, default constructor works', 'Warning only'],
    ans: 1,
    exp: '🎯 TRAP: A has no no-arg constructor! B\'s implicit super() can\'t find it. B MUST define constructor calling super(int).'
  },
  {
    id: 113, diff: 'hard', cat: 'Constructors',
    q: 'class A { int x=1; A() { print(x); x=2; } }\nclass B extends A { int x=3; B() { print(x); } }\nnew B() prints?',
    opts: ['1, 3', '0, 0', '1, 0', '0, 3'],
    ans: 0,
    exp: '🎯 INIT ORDER: super() runs first (prints A\'s x=1), then B\'s field init (x=3), then B\'s constructor body (prints 3). Output: 1, 3'
  },
  {
    id: 114, diff: 'hard', cat: 'Constructors',
    q: 'class A { A() { m(); } void m() { print("A"); } }\nclass B extends A { void m() { print("B"); } }\nnew B() prints?',
    opts: ['A', 'B', 'AB', 'Compilation error'],
    ans: 1,
    exp: '🎯 POLYMORPHISM IN CONSTRUCTOR TRAP: m() is overridden! Even in A\'s constructor, B\'s m() is called (actual type is B). Prints B. DANGEROUS pattern!'
  },
  {
    id: 115, diff: 'medium', cat: 'Constructors',
    q: 'Can constructor be private?',
    opts: ['No', 'Yes, for singleton or utility classes', 'Only in abstract classes', 'Only with public class'],
    ans: 1,
    exp: '🎯 PRIVATE CONSTRUCTOR: Prevents external instantiation. Used for: Singleton, utility classes, factory methods.'
  },
  {
    id: 116, diff: 'medium', cat: 'Constructors',
    q: 'Can constructor be final?',
    opts: ['Yes', 'No, constructors can\'t be final', 'Only in final classes', 'Only private constructors'],
    ans: 1,
    exp: '🎯 NOT FINAL: Constructors aren\'t inherited, so nothing to prevent overriding. "final constructor" is meaningless → compilation error.'
  },
  {
    id: 117, diff: 'medium', cat: 'Constructors',
    q: 'Can constructor be static?',
    opts: ['Yes', 'No, constructors can\'t be static', 'Only in utility classes', 'Only with private'],
    ans: 1,
    exp: '🎯 NOT STATIC: Constructors CREATE instances. Static means "no instance context". Contradiction → compilation error.'
  },
  {
    id: 118, diff: 'medium', cat: 'Constructors',
    q: 'Can constructor be abstract?',
    opts: ['Yes, in abstract classes', 'No, constructors can\'t be abstract', 'Only for interfaces', 'Optional'],
    ans: 1,
    exp: '🎯 NOT ABSTRACT: Abstract means "no implementation". Constructors must have implementation to create objects. Cannot be abstract.'
  },
  {
    id: 119, diff: 'hard', cat: 'Constructors',
    q: 'Can constructor throw exception?',
    opts: ['No', 'Yes, checked or unchecked', 'Only unchecked', 'Only with throws clause'],
    ans: 1,
    exp: '🎯 CAN THROW: Constructors can throw exceptions. Checked exceptions need throws clause. If thrown, object NOT created.'
  },
  {
    id: 120, diff: 'medium', cat: 'Constructors',
    q: 'What is copy constructor?',
    opts: ['Default constructor', 'Constructor taking same type as parameter to copy', 'clone() method', 'Static factory'],
    ans: 1,
    exp: '🎯 COPY CONSTRUCTOR: Point(Point other) { this.x = other.x; this.y = other.y; } Creates copy of existing object.'
  },
  {
    id: 121, diff: 'hard', cat: 'Constructors',
    q: 'What is instance initializer block?',
    opts: ['Constructor', '{ code } outside methods, runs before constructor body', 'Static block', 'Method'],
    ans: 1,
    exp: '🎯 INSTANCE INIT: { code } outside methods. Runs AFTER super(), BEFORE constructor body. Useful for common initialization.'
  },
  {
    id: 122, diff: 'hard', cat: 'Constructors',
    q: 'Order of initialization when creating object?',
    opts: ['Constructor → fields → super()', 'super() → field inits → instance blocks → constructor body', 'Fields → constructor → super()', 'Random'],
    ans: 1,
    exp: '🎯 EXACT ORDER: 1) super() 2) Instance field initializers AND instance blocks in order 3) Constructor body'
  },
  {
    id: 123, diff: 'hard', cat: 'Constructors',
    q: 'static { print("S"); }\n{ print("I"); }\nA() { print("C"); }\nFirst new A() prints?',
    opts: ['S, I, C', 'I, C, S', 'C, I, S', 'S, C, I'],
    ans: 0,
    exp: '🎯 ORDER: Static block (once at class load), then instance block, then constructor. Prints: S, I, C'
  },
  {
    id: 124, diff: 'hard', cat: 'Constructors',
    q: 'Second new A() prints? (after first already executed)',
    opts: ['S, I, C', 'I, C', 'C only', 'Nothing'],
    ans: 1,
    exp: '🎯 STATIC ONCE: Static block runs only ONCE at class loading. Second object: only instance block and constructor. Prints: I, C'
  },
  {
    id: 125, diff: 'hard', cat: 'Constructors',
    q: 'class A {\n  A() { this(5); }\n  A(int x) { this(); }\n}',
    opts: ['Works fine', 'Compilation error - recursive constructor', 'StackOverflow at runtime', 'Creates infinite objects'],
    ans: 2,
    exp: '🎯 RECURSIVE CONSTRUCTORS: A() calls A(int), which calls A(). Infinite recursion → StackOverflowError at runtime!'
  },

  // ==================== INHERITANCE - INTERVIEW CLASSICS (126-155) ====================
  {
    id: 126, diff: 'easy', cat: 'Inheritance',
    q: 'What is inheritance?',
    opts: ['Creating objects', 'Creating new class based on existing one', 'Hiding data', 'Method overloading'],
    ans: 1,
    exp: '🎯 INHERITANCE: Child class EXTENDS parent, inheriting fields and methods. Enables code REUSE and IS-A relationship.'
  },
  {
    id: 127, diff: 'easy', cat: 'Inheritance',
    q: 'Keyword for inheritance?',
    opts: ['implements', 'extends', 'inherits', 'derives'],
    ans: 1,
    exp: '🎯 EXTENDS: class Child extends Parent. Child inherits accessible members from Parent.'
  },
  {
    id: 128, diff: 'medium', cat: 'Inheritance',
    q: 'Can Java class extend multiple classes?',
    opts: ['Yes', 'No, single inheritance only', 'Up to 3', 'Only with interfaces'],
    ans: 1,
    exp: '🎯 SINGLE INHERITANCE: Java class extends exactly ONE class. Multiple inheritance of TYPE via interfaces.'
  },
  {
    id: 129, diff: 'medium', cat: 'Inheritance',
    q: 'Are private members inherited?',
    opts: ['No', 'Yes, but not accessible directly', 'Only in same package', 'Only with getters'],
    ans: 1,
    exp: '🎯 INHERITED BUT HIDDEN: Private members ARE part of child object but NOT ACCESSIBLE directly. Access through inherited public methods.'
  },
  {
    id: 130, diff: 'easy', cat: 'Inheritance',
    q: 'What is the root of all Java classes?',
    opts: ['Class', 'Object', 'Root', 'Main'],
    ans: 1,
    exp: '🎯 java.lang.Object: Every class implicitly extends Object. Provides: toString(), equals(), hashCode(), getClass(), etc.'
  },
  {
    id: 131, diff: 'medium', cat: 'Inheritance',
    q: 'What is "is-a" relationship?',
    opts: ['Composition', 'Inheritance - Dog IS-A Animal', 'Interface', 'Has-a'],
    ans: 1,
    exp: '🎯 IS-A = INHERITANCE: Dog IS-A Animal. Dog can be used wherever Animal expected. Subclass IS-A superclass.'
  },
  {
    id: 132, diff: 'medium', cat: 'Inheritance',
    q: 'What is "has-a" relationship?',
    opts: ['Inheritance', 'Composition - Car HAS-A Engine', 'Interface', 'Is-a'],
    ans: 1,
    exp: '🎯 HAS-A = COMPOSITION: Car HAS-A Engine. Engine is a FIELD in Car. Object contains other objects.'
  },
  {
    id: 133, diff: 'hard', cat: 'Inheritance',
    q: 'Why "prefer composition over inheritance"?',
    opts: ['Faster', 'More flexible, looser coupling, avoids fragile base class', 'Simpler syntax', 'Required by Java'],
    ans: 1,
    exp: '🎯 COMPOSITION BENEFITS: 1) Flexibility (change at runtime) 2) Loose coupling 3) Avoids fragile base class problem 4) Easier testing'
  },
  {
    id: 134, diff: 'medium', cat: 'Inheritance',
    q: 'What is a final class?',
    opts: ['Last class in file', 'Cannot be extended', 'Must be abstract', 'Has final methods'],
    ans: 1,
    exp: '🎯 FINAL CLASS: Cannot be EXTENDED. No subclasses allowed. Examples: String, Integer, Math.'
  },
  {
    id: 135, diff: 'medium', cat: 'Inheritance',
    q: 'Can abstract class be final?',
    opts: ['Yes', 'No, contradiction', 'Only with interfaces', 'Depends'],
    ans: 1,
    exp: '🎯 CONTRADICTION: Abstract needs subclass to instantiate. Final prevents subclass. Cannot be both!'
  },
  {
    id: 136, diff: 'hard', cat: 'Inheritance',
    q: 'class A { int x=1; }\nclass B extends A { int x=2; }\nB b = new B();\nA a = b;\nprint(a.x + ", " + b.x);',
    opts: ['1, 2', '2, 2', '1, 1', '2, 1'],
    ans: 0,
    exp: '🎯 FIELD HIDING: Fields are NOT overridden, they\'re HIDDEN. Reference type determines field access. a.x=1 (A\'s field), b.x=2 (B\'s field).'
  },
  {
    id: 137, diff: 'hard', cat: 'Inheritance',
    q: 'class A { static void m() { print("A"); } }\nclass B extends A { static void m() { print("B"); } }\nA x = new B(); x.m();',
    opts: ['A', 'B', 'Compilation error', 'Runtime error'],
    ans: 0,
    exp: '🎯 STATIC HIDING: Static methods are HIDDEN, not overridden! Called based on REFERENCE type (A), not object type. Prints A.'
  },
  {
    id: 138, diff: 'medium', cat: 'Inheritance',
    q: 'What does "super" keyword do?',
    opts: ['Creates parent object', 'References parent class members', 'Calls static methods', 'Defines superclass'],
    ans: 1,
    exp: '🎯 SUPER: Reference to parent class. super.method() calls parent\'s method. super() calls parent\'s constructor.'
  },
  {
    id: 139, diff: 'hard', cat: 'Inheritance',
    q: 'Can you use super.super.method()?',
    opts: ['Yes', 'No, can only access immediate parent', 'Only in abstract classes', 'With casting'],
    ans: 1,
    exp: '🎯 NO GRANDPARENT ACCESS: super refers to immediate parent only. Cannot skip to grandparent. Java design decision.'
  },
  {
    id: 140, diff: 'medium', cat: 'Inheritance',
    q: 'What is upcasting?',
    opts: ['Parent to child', 'Child to parent type - always safe', 'Explicit cast required', 'Changes object type'],
    ans: 1,
    exp: '🎯 UPCASTING: Child → Parent reference. Always safe, implicit. Animal a = new Dog(); Dog IS-A Animal.'
  },
  {
    id: 141, diff: 'medium', cat: 'Inheritance',
    q: 'What is downcasting?',
    opts: ['Child to parent', 'Parent to child - requires explicit cast', 'Always safe', 'Automatic'],
    ans: 1,
    exp: '🎯 DOWNCASTING: Parent → Child reference. Requires explicit cast. May throw ClassCastException if actual type wrong!'
  },
  {
    id: 142, diff: 'hard', cat: 'Inheritance',
    q: 'Animal a = new Cat();\nDog d = (Dog) a;',
    opts: ['Works fine', 'Compilation error', 'ClassCastException at runtime', 'Returns null'],
    ans: 2,
    exp: '🎯 INVALID CAST: Object is actually Cat, not Dog! Compiles (compiler trusts you) but RUNTIME ClassCastException.'
  },
  {
    id: 143, diff: 'medium', cat: 'Inheritance',
    q: 'How to safely downcast?',
    opts: ['Always try-catch', 'Use instanceof first', 'Use super', 'Use getClass()'],
    ans: 1,
    exp: '🎯 INSTANCEOF: if (animal instanceof Dog) { Dog d = (Dog) animal; } Check before cast to prevent ClassCastException.'
  },
  {
    id: 144, diff: 'hard', cat: 'Inheritance',
    q: 'What is diamond problem?',
    opts: ['Diamond operator', 'Ambiguity when class inherits same method from two parents', 'Shape inheritance', 'Constructor issue'],
    ans: 1,
    exp: '🎯 DIAMOND PROBLEM: Class D extends B and C, both extend A. If B and C override A\'s method, which does D inherit? Java avoids with single inheritance.'
  },
  {
    id: 145, diff: 'hard', cat: 'Inheritance',
    q: 'How does Java handle diamond problem with interfaces?',
    opts: ['Not allowed', 'Class must override conflicting default method', 'Random selection', 'Compilation error always'],
    ans: 1,
    exp: '🎯 INTERFACE DIAMOND: If two interfaces have same default method, implementing class MUST override to resolve ambiguity.'
  },
  {
    id: 146, diff: 'hard', cat: 'Inheritance',
    q: 'What is Liskov Substitution Principle?',
    opts: ['Any class can substitute', 'Subclass must be usable wherever parent expected without breaking behavior', 'Multiple inheritance', 'Interface rule'],
    ans: 1,
    exp: '🎯 LSP: Subclass objects should be SUBSTITUTABLE for parent objects without breaking program correctness. Behavioral compatibility!'
  },
  {
    id: 147, diff: 'hard', cat: 'Inheritance',
    q: 'Square extends Rectangle. Good design?',
    opts: ['Yes, square is-a rectangle', 'No, violates LSP', 'Yes, mathematically correct', 'Depends on implementation'],
    ans: 1,
    exp: '🎯 LSP VIOLATION: Rectangle.setWidth() expects width-only change. Square must change both dimensions → different behavior. Violates LSP!'
  },
  {
    id: 148, diff: 'hard', cat: 'Inheritance',
    q: 'What is fragile base class problem?',
    opts: ['Abstract class issue', 'Changes in parent can unexpectedly break child classes', 'Final class problem', 'Interface issue'],
    ans: 1,
    exp: '🎯 FRAGILE BASE: Parent class changes can BREAK subclasses unexpectedly. Tight coupling issue. Reason to prefer composition.'
  },
  {
    id: 149, diff: 'medium', cat: 'Inheritance',
    q: 'Can subclass have more methods than parent?',
    opts: ['No', 'Yes, can add new methods', 'Only override', 'Only with interfaces'],
    ans: 1,
    exp: '🎯 EXTENSION: Subclass inherits parent\'s methods AND can add new ones. Subclass is parent + more.'
  },
  {
    id: 150, diff: 'hard', cat: 'Inheritance',
    q: 'class A { void m() throws IOException {} }\nclass B extends A { void m() throws Exception {} }',
    opts: ['Valid override', 'Invalid - cannot throw broader exception', 'Valid - Exception includes IOException', 'Runtime error'],
    ans: 1,
    exp: '🎯 EXCEPTION RULE: Override CANNOT throw broader checked exception than parent. Exception is broader than IOException → compilation error!'
  },
  {
    id: 151, diff: 'hard', cat: 'Inheritance',
    q: 'class A { void m() throws IOException {} }\nclass B extends A { void m() {} }',
    opts: ['Invalid', 'Valid - can throw fewer/no exceptions', 'Must throw same', 'Only unchecked'],
    ans: 1,
    exp: '🎯 FEWER EXCEPTIONS OK: Override can throw fewer/narrower/no checked exceptions. Not throwing is valid!'
  },
  {
    id: 152, diff: 'hard', cat: 'Inheritance',
    q: 'class A { void m() {} }\nclass B extends A { void m() throws IOException {} }',
    opts: ['Valid', 'Invalid - cannot add checked exception', 'Valid with throws', 'Runtime error'],
    ans: 1,
    exp: '🎯 CANNOT ADD: If parent doesn\'t throw checked exception, override cannot add it! Can only add unchecked (RuntimeException).'
  },
  {
    id: 153, diff: 'medium', cat: 'Inheritance',
    q: 'What is method hiding vs overriding?',
    opts: ['Same thing', 'Hiding for static, overriding for instance methods', 'Hiding uses super', 'Override uses this'],
    ans: 1,
    exp: '🎯 HIDING vs OVERRIDING: Static methods are HIDDEN (resolved by reference type). Instance methods are OVERRIDDEN (resolved by object type).'
  },
  {
    id: 154, diff: 'hard', cat: 'Inheritance',
    q: 'class A { A m() { return this; } }\nclass B extends A { B m() { return this; } }\nValid?',
    opts: ['No, different return type', 'Yes, covariant return type', 'Only with casting', 'Compilation error'],
    ans: 1,
    exp: '🎯 COVARIANT RETURN: Override can return SUBTYPE. B extends A, so returning B when parent returns A is valid.'
  },
  {
    id: 155, diff: 'hard', cat: 'Inheritance',
    q: 'Can constructor be overridden?',
    opts: ['Yes', 'No, constructors are not inherited', 'Only public ones', 'Only with super'],
    ans: 1,
    exp: '🎯 NOT INHERITED: Constructors are NOT inherited, so cannot be overridden. Each class defines its own constructors.'
  },

  // ==================== METHOD OVERRIDING - TRICKY SCENARIOS (156-175) ====================
  {
    id: 156, diff: 'easy', cat: 'Overriding',
    q: 'What is method overriding?',
    opts: ['Adding methods', 'Subclass provides new implementation of inherited method', 'Removing methods', 'Same class, different params'],
    ans: 1,
    exp: '🎯 OVERRIDING: Subclass provides NEW IMPLEMENTATION of inherited method. Same signature, different behavior.'
  },
  {
    id: 157, diff: 'medium', cat: 'Overriding',
    q: 'What does @Override annotation do?',
    opts: ['Creates override', 'Tells compiler to verify it\'s actually overriding', 'Required for override', 'Makes method final'],
    ans: 1,
    exp: '🎯 @OVERRIDE: Optional but recommended. Compiler verifies method actually overrides. Catches typos in method name!'
  },
  {
    id: 158, diff: 'medium', cat: 'Overriding',
    q: 'Can private method be overridden?',
    opts: ['Yes', 'No, not visible to subclass', 'Only protected', 'Only in same package'],
    ans: 1,
    exp: '🎯 PRIVATE NOT OVERRIDDEN: Private methods are INVISIBLE to subclass. Defining same method in child is NOT overriding - it\'s a new method.'
  },
  {
    id: 159, diff: 'medium', cat: 'Overriding',
    q: 'Can static method be overridden?',
    opts: ['Yes', 'No, only hidden', 'Only public static', 'Always'],
    ans: 1,
    exp: '🎯 STATIC HIDDEN NOT OVERRIDDEN: Static belongs to class. Subclass can define same signature but it HIDES, not overrides. No polymorphism!'
  },
  {
    id: 160, diff: 'medium', cat: 'Overriding',
    q: 'Can final method be overridden?',
    opts: ['Yes', 'No, final prevents override', 'Only in same package', 'Only if public'],
    ans: 1,
    exp: '🎯 FINAL = NO OVERRIDE: final method cannot be overridden. Parent locks down behavior for all subclasses.'
  },
  {
    id: 161, diff: 'medium', cat: 'Overriding',
    q: 'Can override reduce visibility?',
    opts: ['Yes', 'No, must be same or MORE visible', 'Only private to protected', 'Only public to default'],
    ans: 1,
    exp: '🎯 VISIBILITY RULE: Override must be SAME or MORE visible. public → protected → default → private. Cannot reduce!'
  },
  {
    id: 162, diff: 'hard', cat: 'Overriding',
    q: 'class A { protected void m() {} }\nclass B extends A { void m() {} } // default',
    opts: ['Valid', 'Invalid - reduced visibility', 'Valid in same package', 'Warning only'],
    ans: 1,
    exp: '🎯 VISIBILITY REDUCED: default < protected. Override reduced visibility from protected to default → compilation error!'
  },
  {
    id: 163, diff: 'hard', cat: 'Overriding',
    q: 'class A { void m() {} }\nclass B extends A { public void m() {} }',
    opts: ['Invalid', 'Valid - increased visibility', 'Valid only if A is abstract', 'Warning'],
    ans: 1,
    exp: '🎯 MORE VISIBLE OK: public > default. Override can INCREASE visibility. Valid!'
  },
  {
    id: 164, diff: 'medium', cat: 'Overriding',
    q: 'How to call parent\'s overridden method?',
    opts: ['parent.method()', 'super.method()', 'base.method()', 'Parent.method()'],
    ans: 1,
    exp: '🎯 SUPER: super.methodName() calls parent\'s version of overridden method from within child class.'
  },
  {
    id: 165, diff: 'hard', cat: 'Overriding',
    q: 'class A { void m() { print("A"); } }\nclass B extends A { void m() { super.m(); print("B"); } }\nnew B().m() prints?',
    opts: ['A', 'B', 'AB', 'BA'],
    ans: 2,
    exp: '🎯 SUPER CALL: B.m() first calls super.m() (prints A), then prints B. Output: AB'
  },
  {
    id: 166, diff: 'hard', cat: 'Overriding',
    q: 'What is dynamic method dispatch?',
    opts: ['Compile-time binding', 'JVM determines method at RUNTIME based on actual object type', 'Static binding', 'Constructor call'],
    ans: 1,
    exp: '🎯 DYNAMIC DISPATCH: JVM uses virtual method table (vtable) to find correct override at RUNTIME. Core of polymorphism!'
  },
  {
    id: 167, diff: 'hard', cat: 'Overriding',
    q: 'class A { void m(){print(1);} }\nclass B extends A { void m(){print(2);} }\nclass C extends B {}\nnew C().m() prints?',
    opts: ['1', '2', 'Error', 'Nothing'],
    ans: 1,
    exp: '🎯 INHERITED OVERRIDE: C inherits B\'s override. Most specific override wins. Prints 2.'
  },
  {
    id: 168, diff: 'medium', cat: 'Overriding',
    q: 'Difference: overloading vs overriding?',
    opts: ['Same thing', 'Overload: diff params, same/diff class. Override: same params, parent-child', 'Overload in subclass only', 'Override in same class'],
    ans: 1,
    exp: '🎯 KEY DIFFERENCE: Overloading = same name, DIFFERENT params (compile-time). Overriding = same signature, CHILD replaces parent (runtime).'
  },
  {
    id: 169, diff: 'hard', cat: 'Overriding',
    q: 'class A { void m(int x) {} }\nclass B extends A { void m(double x) {} }\nIs B.m overriding or overloading?',
    opts: ['Overriding', 'Overloading - different parameter type', 'Both', 'Neither'],
    ans: 1,
    exp: '🎯 OVERLOADING: Parameters differ (int vs double). Not same signature → not overriding. B has both m(int) inherited and m(double) defined.'
  },
  {
    id: 170, diff: 'hard', cat: 'Overriding',
    q: 'Must override all abstract methods?',
    opts: ['Yes, always', 'Yes, unless subclass is also abstract', 'No, optional', 'Only public ones'],
    ans: 1,
    exp: '🎯 ABSTRACT RULE: Concrete class MUST implement all inherited abstract methods. Or declare itself abstract.'
  },
  {
    id: 171, diff: 'hard', cat: 'Overriding',
    q: 'Can override add synchronized?',
    opts: ['No', 'Yes, not part of signature', 'Only static methods', 'Only final methods'],
    ans: 1,
    exp: '🎯 SYNCHRONIZED NOT IN SIGNATURE: Override can add or remove synchronized. Doesn\'t affect method signature.'
  },
  {
    id: 172, diff: 'hard', cat: 'Overriding',
    q: 'class A { Object m() { return null; } }\nclass B extends A { String m() { return ""; } }\nValid?',
    opts: ['No, different return type', 'Yes, String is subtype of Object (covariant)', 'Only with cast', 'Warning'],
    ans: 1,
    exp: '🎯 COVARIANT RETURN: String extends Object. Override returning more specific type is valid since Java 5.'
  },
  {
    id: 173, diff: 'hard', cat: 'Overriding',
    q: 'class A { int m() { return 1; } }\nclass B extends A { short m() { return 1; } }\nValid?',
    opts: ['Yes, short is smaller', 'No, primitives not covariant', 'Yes, both numeric', 'Warning only'],
    ans: 1,
    exp: '🎯 PRIMITIVES NOT COVARIANT: Covariant returns only for OBJECTS. Primitives must match exactly. int ≠ short → error!'
  },
  {
    id: 174, diff: 'hard', cat: 'Overriding',
    q: 'Does overriding affect overloaded methods in parent?',
    opts: ['Yes, all overloads affected', 'No, only matching signature affected', 'All methods with same name', 'Depends'],
    ans: 1,
    exp: '🎯 SPECIFIC OVERRIDE: Only method with EXACT matching signature is overridden. Other overloads remain inherited unchanged.'
  },
  {
    id: 175, diff: 'hard', cat: 'Overriding',
    q: 'class A { void m(Object o) {} }\nclass B extends A { void m(String s) {} }\nA a = new B(); a.m("hi");',
    opts: ['Calls B.m(String)', 'Calls A.m(Object)', 'Compilation error', 'Runtime error'],
    ans: 1,
    exp: '🎯 NOT OVERRIDE: B.m(String) is OVERLOAD not override of A.m(Object). Reference type A only sees m(Object). Calls A.m(Object)!'
  },

  // ==================== POLYMORPHISM - CORE INTERVIEW CONCEPT (176-200) ====================
  {
    id: 176, diff: 'easy', cat: 'Polymorphism',
    q: 'What is polymorphism?',
    opts: ['Multiple constructors', 'Same code works with different types', 'Private fields', 'Static methods'],
    ans: 1,
    exp: '🎯 POLYMORPHISM: "Many forms" - write code once, works with multiple types. Object behaves differently based on actual type.'
  },
  {
    id: 177, diff: 'medium', cat: 'Polymorphism',
    q: 'Employee e = new Lawyer();\nWhat is e\'s type?',
    opts: ['Employee only', 'Lawyer only', 'Reference type: Employee, Actual type: Lawyer', 'Neither'],
    ans: 2,
    exp: '🎯 TWO TYPES: REFERENCE type (Employee) determines what you can CALL. ACTUAL type (Lawyer) determines what RUNS.'
  },
  {
    id: 178, diff: 'hard', cat: 'Polymorphism',
    q: 'class A { void m(){print("A");} }\nclass B extends A { void m(){print("B");} }\nA x = new B(); x.m();',
    opts: ['A', 'B', 'AB', 'Compilation error'],
    ans: 1,
    exp: '🎯 RUNTIME POLYMORPHISM: Method from ACTUAL type (B) is called. Reference type doesn\'t matter for overridden methods. Prints B.'
  },
  {
    id: 179, diff: 'medium', cat: 'Polymorphism',
    q: 'Compile-time vs runtime polymorphism?',
    opts: ['Same thing', 'Compile: overloading. Runtime: overriding', 'Compile: overriding', 'No difference'],
    ans: 1,
    exp: '🎯 COMPILE-TIME: Overloading - compiler picks method by params. RUNTIME: Overriding - JVM picks method by actual type.'
  },
  {
    id: 180, diff: 'hard', cat: 'Polymorphism',
    q: 'Employee e = new Lawyer();\ne.sue(); // Lawyer-only method',
    opts: ['Works fine', 'Compilation error - sue() not in Employee', 'Runtime error', 'Works with casting'],
    ans: 1,
    exp: '🎯 REFERENCE TYPE LIMITS: Reference type (Employee) determines accessible methods. sue() not in Employee → compilation error!'
  },
  {
    id: 181, diff: 'hard', cat: 'Polymorphism',
    q: 'How to call Lawyer-specific method on Employee reference?',
    opts: ['Just call it', 'Cast: ((Lawyer)e).sue()', 'Use super', 'Not possible'],
    ans: 1,
    exp: '🎯 DOWNCAST: ((Lawyer)e).sue(). Must cast to access subclass-specific methods. Use instanceof to check safety.'
  },
  {
    id: 182, diff: 'medium', cat: 'Polymorphism',
    q: 'What is binding?',
    opts: ['Variable assignment', 'Connecting method call to method body', 'Casting', 'Inheritance'],
    ans: 1,
    exp: '🎯 BINDING: Connecting method CALL to method BODY. Early binding (compile-time) vs Late binding (runtime/dynamic).'
  },
  {
    id: 183, diff: 'hard', cat: 'Polymorphism',
    q: 'Which uses early binding?',
    opts: ['Overridden methods', 'Static, private, final methods', 'Abstract methods', 'All methods'],
    ans: 1,
    exp: '🎯 EARLY BINDING: static, private, final can\'t be overridden. Compiler knows exact method at compile time.'
  },
  {
    id: 184, diff: 'hard', cat: 'Polymorphism',
    q: 'Which uses late binding?',
    opts: ['Static methods', 'Instance methods that can be overridden', 'Private methods', 'Final methods'],
    ans: 1,
    exp: '🎯 LATE BINDING: Instance methods (non-private, non-final). JVM determines actual method at runtime based on object type.'
  },
  {
    id: 185, diff: 'medium', cat: 'Polymorphism',
    q: 'Can array be polymorphic?',
    opts: ['No', 'Yes, Animal[] can hold Dog objects', 'Only Object[]', 'Only primitives'],
    ans: 1,
    exp: '🎯 ARRAY POLYMORPHISM: Animal[] arr = new Animal[5]; arr[0] = new Dog(); Array can hold any subtype objects.'
  },
  {
    id: 186, diff: 'hard', cat: 'Polymorphism',
    q: 'Object[] arr = new String[5];\narr[0] = new Integer(1);',
    opts: ['Works fine', 'Compilation error', 'ArrayStoreException at runtime', 'Returns null'],
    ans: 2,
    exp: '🎯 ARRAY COVARIANCE TRAP: Actual array is String[]. Can\'t store Integer in String array. RUNTIME ArrayStoreException!'
  },
  {
    id: 187, diff: 'hard', cat: 'Polymorphism',
    q: 'Employee e = new Lawyer();\ne.getClass() returns?',
    opts: ['class Employee', 'class Lawyer', 'Both', 'null'],
    ans: 1,
    exp: '🎯 getClass(): Returns ACTUAL runtime type: class Lawyer. Useful for reflection and type checking.'
  },
  {
    id: 188, diff: 'hard', cat: 'Polymorphism',
    q: 'What is polymorphic parameter?',
    opts: ['Varargs', 'Parameter of parent type that accepts any subtype', 'Generic type', 'Object parameter'],
    ans: 1,
    exp: '🎯 POLYMORPHIC PARAM: void process(Animal a) works with Dog, Cat, any Animal subclass. Write once, works with all!'
  },
  {
    id: 189, diff: 'medium', cat: 'Polymorphism',
    q: 'void process(Animal a) { a.eat(); }\nWhat happens with different animals?',
    opts: ['Always same behavior', 'Each animal\'s eat() is called (polymorphism)', 'Compilation error', 'Runtime error'],
    ans: 1,
    exp: '🎯 POLYMORPHISM POWER: Same code, different behavior! Dog.eat() for dogs, Cat.eat() for cats. Actual type determines behavior.'
  },
  {
    id: 190, diff: 'hard', cat: 'Polymorphism',
    q: 'List<Animal> list = new ArrayList<Dog>();',
    opts: ['Valid', 'Compilation error - generics not covariant', 'Runtime error', 'Warning only'],
    ans: 1,
    exp: '🎯 GENERICS NOT COVARIANT: List<Dog> is NOT a List<Animal>! Unlike arrays, generics are invariant. Use wildcards: List<? extends Animal>'
  },
  {
    id: 191, diff: 'hard', cat: 'Polymorphism',
    q: 'List<? extends Animal> list = new ArrayList<Dog>();\nlist.add(new Dog());',
    opts: ['Works fine', 'Compilation error - cannot add to ? extends', 'Runtime error', 'Warning'],
    ans: 1,
    exp: '🎯 UPPER BOUND TRAP: ? extends means "unknown subtype". Can\'t add because compiler doesn\'t know exact type. Can only READ.'
  },
  {
    id: 192, diff: 'hard', cat: 'Polymorphism',
    q: 'List<? super Dog> list = new ArrayList<Animal>();\nlist.add(new Dog());',
    opts: ['Compilation error', 'Works fine - can add Dog or subtype', 'Runtime error', 'Warning'],
    ans: 1,
    exp: '🎯 LOWER BOUND: ? super Dog means "Dog or supertype". Can ADD Dog (or subtypes) safely. Can only read as Object.'
  },
  {
    id: 193, diff: 'medium', cat: 'Polymorphism',
    q: 'What is ad-hoc polymorphism?',
    opts: ['Runtime polymorphism', 'Method overloading', 'Inheritance polymorphism', 'Interface polymorphism'],
    ans: 1,
    exp: '🎯 AD-HOC: Method OVERLOADING. Same name, different behavior for different parameter types. Compile-time polymorphism.'
  },
  {
    id: 194, diff: 'medium', cat: 'Polymorphism',
    q: 'What is subtype polymorphism?',
    opts: ['Overloading', 'Inheritance/interface - subtype used where supertype expected', 'Generics', 'Casting'],
    ans: 1,
    exp: '🎯 SUBTYPE: Classic OOP polymorphism. Dog can be used wherever Animal expected. IS-A relationship enables substitution.'
  },
  {
    id: 195, diff: 'medium', cat: 'Polymorphism',
    q: 'What is parametric polymorphism?',
    opts: ['Inheritance', 'Overloading', 'Generics - same code works with any type parameter', 'Interfaces'],
    ans: 2,
    exp: '🎯 PARAMETRIC: GENERICS. List<T> works with any T. Same code handles multiple types through type parameters.'
  },
  {
    id: 196, diff: 'hard', cat: 'Polymorphism',
    q: 'class A { void m() { n(); } void n() { print("A"); } }\nclass B extends A { void n() { print("B"); } }\nnew B().m() prints?',
    opts: ['A', 'B', 'AB', 'Error'],
    ans: 1,
    exp: '🎯 POLYMORPHISM CHAIN: m() calls n(). On B object, n() is overridden. B\'s n() is called. Prints B.'
  },
  {
    id: 197, diff: 'hard', cat: 'Polymorphism',
    q: 'Why is polymorphism powerful?',
    opts: ['Faster code', 'Write once, works with all current and FUTURE subtypes', 'Less memory', 'Simpler syntax'],
    ans: 1,
    exp: '🎯 OPEN/CLOSED: Code open for extension (new subtypes), closed for modification. Add new classes without changing existing code!'
  },
  {
    id: 198, diff: 'hard', cat: 'Polymorphism',
    q: 'void draw(Shape s) { s.draw(); }\nWorks with Circle, Square, future shapes?',
    opts: ['Only existing shapes', 'Yes, any Shape subclass works', 'Needs modification', 'Only with casting'],
    ans: 1,
    exp: '🎯 EXTENSIBILITY: Code works with ANY Shape - Circle, Square, and future shapes not yet created. No modification needed!'
  },
  {
    id: 199, diff: 'hard', cat: 'Polymorphism',
    q: 'Which principle does polymorphism enable?',
    opts: ['Single responsibility', 'Open/Closed principle - open for extension, closed for modification', 'DRY', 'YAGNI'],
    ans: 1,
    exp: '🎯 OCP: Open/Closed Principle. Add new behavior through new classes without modifying existing code. Polymorphism is the key!'
  },
  {
    id: 200, diff: 'hard', cat: 'Polymorphism',
    q: 'Animal[] animals = {new Dog(), new Cat(), new Bird()};\nfor(Animal a : animals) a.speak();',
    opts: ['All print same thing', 'Each animal\'s speak() called', 'Compilation error', 'Runtime error'],
    ans: 1,
    exp: '🎯 POLYMORPHISM IN ACTION: Same loop code, different behavior per type. Dog.speak(), Cat.speak(), Bird.speak() each called.'
  },

  // ==================== INTERFACES - INTERVIEW FAVORITES (201-225) ====================
  {
    id: 201, diff: 'easy', cat: 'Interfaces',
    q: 'What is an interface?',
    opts: ['Concrete class', 'Contract specifying methods a class must implement', 'Abstract class', 'Package'],
    ans: 1,
    exp: '🎯 INTERFACE: CONTRACT defining WHAT without HOW. Specifies method signatures that implementing classes must provide.'
  },
  {
    id: 202, diff: 'easy', cat: 'Interfaces',
    q: 'Keyword to implement interface?',
    opts: ['extends', 'implements', 'uses', 'interface'],
    ans: 1,
    exp: '🎯 IMPLEMENTS: class MyClass implements MyInterface. Class must provide implementations for all abstract methods.'
  },
  {
    id: 203, diff: 'medium', cat: 'Interfaces',
    q: 'Can class implement multiple interfaces?',
    opts: ['No', 'Yes, unlimited', 'Maximum 2', 'Only with extends'],
    ans: 1,
    exp: '🎯 MULTIPLE INTERFACES: Yes! class A implements B, C, D. Multiple inheritance of TYPE (not implementation).'
  },
  {
    id: 204, diff: 'medium', cat: 'Interfaces',
    q: 'What if class doesn\'t implement all interface methods?',
    opts: ['Works fine', 'Compilation error - must implement all or be abstract', 'Runtime error', 'Warning'],
    ans: 1,
    exp: '🎯 MUST IMPLEMENT ALL: Either implement all abstract methods OR declare class as abstract.'
  },
  {
    id: 205, diff: 'medium', cat: 'Interfaces',
    q: 'Can interface have method bodies?',
    opts: ['Never', 'Yes, with default keyword (Java 8+)', 'Only static', 'Only private'],
    ans: 1,
    exp: '🎯 DEFAULT METHODS: Since Java 8, interfaces can have default methods with bodies. Classes can override or inherit them.'
  },
  {
    id: 206, diff: 'hard', cat: 'Interfaces',
    q: 'Why were default methods added in Java 8?',
    opts: ['Performance', 'Add methods to interfaces without breaking existing implementations', 'Style', 'Required'],
    ans: 1,
    exp: '🎯 INTERFACE EVOLUTION: Default methods allow adding new methods to interfaces without forcing ALL implementers to update.'
  },
  {
    id: 207, diff: 'medium', cat: 'Interfaces',
    q: 'Can interface have static methods?',
    opts: ['No', 'Yes, since Java 8', 'Only abstract', 'Only default'],
    ans: 1,
    exp: '🎯 STATIC METHODS: Yes (Java 8+). Called on interface: InterfaceName.staticMethod(). Not inherited by implementing classes.'
  },
  {
    id: 208, diff: 'hard', cat: 'Interfaces',
    q: 'Can interface have private methods?',
    opts: ['No', 'Yes, since Java 9', 'Only static', 'Only default'],
    ans: 1,
    exp: '🎯 PRIVATE METHODS: Yes (Java 9+). For code sharing between default methods. Not visible to implementers.'
  },
  {
    id: 209, diff: 'medium', cat: 'Interfaces',
    q: 'What access level are interface methods by default?',
    opts: ['private', 'default (package)', 'public (always)', 'protected'],
    ans: 2,
    exp: '🎯 PUBLIC BY DEFAULT: Interface methods are implicitly public. Cannot be protected or package-private.'
  },
  {
    id: 210, diff: 'medium', cat: 'Interfaces',
    q: 'Can interface have fields?',
    opts: ['No', 'Yes, implicitly public static final (constants)', 'Only private', 'Only with initializer'],
    ans: 1,
    exp: '🎯 CONSTANTS ONLY: Interface fields are automatically public static final. Must be initialized. No instance variables.'
  },
  {
    id: 211, diff: 'easy', cat: 'Interfaces',
    q: 'Can interface be instantiated?',
    opts: ['Yes', 'No, cannot create interface objects', 'Only with factory', 'Only anonymous'],
    ans: 1,
    exp: '🎯 CANNOT INSTANTIATE: Interfaces define contract, not implementation. Use: InterfaceType x = new ImplementingClass();'
  },
  {
    id: 212, diff: 'medium', cat: 'Interfaces',
    q: 'Can interface extend another interface?',
    opts: ['No', 'Yes, with extends keyword', 'Uses implements', 'Not allowed'],
    ans: 1,
    exp: '🎯 EXTENDS FOR INTERFACES: interface Child extends Parent. Interfaces use extends, not implements.'
  },
  {
    id: 213, diff: 'hard', cat: 'Interfaces',
    q: 'Can interface extend multiple interfaces?',
    opts: ['No', 'Yes, multiple inheritance for interfaces allowed', 'Only 2', 'Only with abstract'],
    ans: 1,
    exp: '🎯 MULTIPLE INHERITANCE: interface C extends A, B. Unlike classes, interfaces can extend multiple interfaces.'
  },
  {
    id: 214, diff: 'hard', cat: 'Interfaces',
    q: 'interface A { default void m(){} }\ninterface B { default void m(){} }\nclass C implements A, B {}',
    opts: ['Works fine', 'C must override m() to resolve conflict', 'Compilation error', 'Random selection'],
    ans: 1,
    exp: '🎯 DIAMOND RESOLUTION: Both interfaces have default m(). C MUST override to resolve ambiguity. Can call A.super.m() or B.super.m().'
  },
  {
    id: 215, diff: 'medium', cat: 'Interfaces',
    q: 'Interface vs abstract class difference?',
    opts: ['Same thing', 'Interface: contract, multiple inheritance. Abstract: partial implementation, single inheritance', 'Interface is faster', 'No difference'],
    ans: 1,
    exp: '🎯 KEY DIFFERENCES: Interface = pure contract, multiple inheritance, no state. Abstract class = partial implementation, single inheritance, can have state.'
  },
  {
    id: 216, diff: 'medium', cat: 'Interfaces',
    q: 'When to use interface vs abstract class?',
    opts: ['Always interface', 'Interface for capability, abstract for shared implementation', 'Always abstract', 'Doesn\'t matter'],
    ans: 1,
    exp: '🎯 DESIGN CHOICE: Interface for "can do" (Comparable, Serializable). Abstract class for "is-a" with shared code.'
  },
  {
    id: 217, diff: 'medium', cat: 'Interfaces',
    q: 'What is marker interface?',
    opts: ['Has many methods', 'Empty interface signaling capability', 'Has default methods', 'Has static methods'],
    ans: 1,
    exp: '🎯 MARKER: Interface with NO methods. Marks classes for special treatment. Examples: Serializable, Cloneable.'
  },
  {
    id: 218, diff: 'medium', cat: 'Interfaces',
    q: 'What is functional interface?',
    opts: ['Many methods', 'Exactly ONE abstract method', 'No methods', 'All default'],
    ans: 1,
    exp: '🎯 FUNCTIONAL: Exactly ONE abstract method. Can have default/static methods. Used with lambdas. @FunctionalInterface annotation.'
  },
  {
    id: 219, diff: 'hard', cat: 'Interfaces',
    q: '@FunctionalInterface\ninterface F { void m(); default void n(){} static void o(){} }',
    opts: ['Invalid - multiple methods', 'Valid - only one ABSTRACT method', 'Invalid annotation', 'Warning'],
    ans: 1,
    exp: '🎯 FUNCTIONAL CHECK: Only counts ABSTRACT methods. m() is abstract. n() is default, o() is static. Valid functional interface!'
  },
  {
    id: 220, diff: 'easy', cat: 'Interfaces',
    q: 'What is Comparable interface?',
    opts: ['For cloning', 'Defines natural ordering with compareTo()', 'For equality', 'For printing'],
    ans: 1,
    exp: '🎯 COMPARABLE: compareTo(T o) returns negative (less), zero (equal), positive (greater). Natural ordering for sorting.'
  },
  {
    id: 221, diff: 'medium', cat: 'Interfaces',
    q: 'What is Comparator interface?',
    opts: ['Same as Comparable', 'External comparison, allows multiple orderings', 'For equality', 'For hashing'],
    ans: 1,
    exp: '🎯 COMPARATOR: compare(T o1, T o2). EXTERNAL comparison. Can define multiple orderings for same class.'
  },
  {
    id: 222, diff: 'medium', cat: 'Interfaces',
    q: 'compareTo() returns 0 means?',
    opts: ['First is smaller', 'Objects are equal', 'First is larger', 'Error'],
    ans: 1,
    exp: '🎯 RETURN VALUES: negative = this < other, 0 = equal, positive = this > other. Zero means equal for ordering purposes.'
  },
  {
    id: 223, diff: 'hard', cat: 'Interfaces',
    q: 'return this.age - other.age; // in compareTo\nProblem?',
    opts: ['No problem', 'Integer overflow for extreme values', 'Syntax error', 'Wrong return type'],
    ans: 1,
    exp: '🎯 OVERFLOW TRAP: Subtraction can overflow! Integer.MAX_VALUE - (-1) overflows. Use Integer.compare(this.age, other.age) instead.'
  },
  {
    id: 224, diff: 'hard', cat: 'Interfaces',
    q: 'Can interface have constructor?',
    opts: ['Yes', 'No, cannot instantiate interface', 'Only private', 'Only default'],
    ans: 1,
    exp: '🎯 NO CONSTRUCTOR: Interfaces cannot be instantiated. Constructor would be meaningless. Compilation error if attempted.'
  },
  {
    id: 225, diff: 'hard', cat: 'Interfaces',
    q: 'What is sealed interface (Java 17)?',
    opts: ['Cannot be implemented', 'Restricts which classes can implement it', 'Final interface', 'Private interface'],
    ans: 1,
    exp: '🎯 SEALED: sealed interface Shape permits Circle, Square. Only listed classes can implement. Limited, known set of implementations.'
  },

  // ==================== ABSTRACT CLASSES - TRICKY CONCEPTS (226-250) ====================
  {
    id: 226, diff: 'easy', cat: 'Abstract',
    q: 'What is abstract class?',
    opts: ['Normal class', 'Class that cannot be instantiated directly', 'Interface', 'Final class'],
    ans: 1,
    exp: '🎯 ABSTRACT CLASS: Cannot create objects directly. May have abstract methods (no body) and concrete methods (with body).'
  },
  {
    id: 227, diff: 'easy', cat: 'Abstract',
    q: 'Can you create objects of abstract class?',
    opts: ['Yes, with new', 'No, cannot instantiate directly', 'Only with factory', 'Only in subclass'],
    ans: 1,
    exp: '🎯 NO INSTANTIATION: Cannot: new AbstractClass(). Must create object of CONCRETE subclass that extends it.'
  },
  {
    id: 228, diff: 'medium', cat: 'Abstract',
    q: 'What is abstract method?',
    opts: ['Method with body', 'Method declaration without implementation', 'Private method', 'Final method'],
    ans: 1,
    exp: '🎯 ABSTRACT METHOD: abstract void method(); No body, ends with semicolon. Subclass MUST provide implementation.'
  },
  {
    id: 229, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract class have concrete methods?',
    opts: ['No, all must be abstract', 'Yes, can have both abstract and concrete', 'Only static', 'Only private'],
    ans: 1,
    exp: '🎯 MIXED ALLOWED: Abstract class can have both abstract methods (no body) and concrete methods (with body). Partial implementation!'
  },
  {
    id: 230, diff: 'hard', cat: 'Abstract',
    q: 'Can abstract class implement interface without implementing all methods?',
    opts: ['No', 'Yes, concrete subclass must complete implementation', 'Only if final', 'Never'],
    ans: 1,
    exp: '🎯 PARTIAL IMPLEMENTATION: Abstract class can skip some interface methods. First CONCRETE subclass must implement all remaining.'
  },
  {
    id: 231, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract class have constructor?',
    opts: ['No, can\'t instantiate', 'Yes, called by subclass constructors', 'Only default', 'Only private'],
    ans: 1,
    exp: '🎯 HAS CONSTRUCTORS: Called by subclass constructors via super(). Used to initialize common state.'
  },
  {
    id: 232, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract method be private?',
    opts: ['Yes', 'No, must be inheritable to be implemented', 'Only protected', 'Only public'],
    ans: 1,
    exp: '🎯 NOT PRIVATE: Abstract methods MUST be inherited to be implemented. Private is invisible to subclasses → contradiction!'
  },
  {
    id: 233, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract method be static?',
    opts: ['Yes', 'No, static cannot be overridden', 'Only in interfaces', 'Only final'],
    ans: 1,
    exp: '🎯 NOT STATIC: Static belongs to class, cannot be overridden. Abstract requires implementation in subclass → contradiction!'
  },
  {
    id: 234, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract method be final?',
    opts: ['Yes', 'No, final prevents override, abstract requires it', 'Only in abstract class', 'Optional'],
    ans: 1,
    exp: '🎯 NOT FINAL: final prevents override. abstract requires override. Contradiction → compilation error!'
  },
  {
    id: 235, diff: 'hard', cat: 'Abstract',
    q: 'Can abstract class have fields?',
    opts: ['No', 'Yes, any fields like regular class', 'Only static', 'Only final'],
    ans: 1,
    exp: '🎯 HAS FIELDS: Abstract class can have instance fields, static fields, any access modifiers. Just like regular class.'
  },
  {
    id: 236, diff: 'hard', cat: 'Abstract',
    q: 'abstract class A { abstract void m(); }\nclass B extends A { }\nCompiles?',
    opts: ['Yes', 'No, B must implement m() or be abstract', 'Warning only', 'Runtime error'],
    ans: 1,
    exp: '🎯 MUST IMPLEMENT: Concrete class B must implement ALL abstract methods. Either implement m() or declare B as abstract.'
  },
  {
    id: 237, diff: 'hard', cat: 'Abstract',
    q: 'Can class be abstract without abstract methods?',
    opts: ['No, needs at least one', 'Yes, to prevent instantiation', 'Only with interface', 'Only with final'],
    ans: 1,
    exp: '🎯 VALID: Can mark class abstract just to PREVENT direct instantiation, even without abstract methods.'
  },
  {
    id: 238, diff: 'hard', cat: 'Abstract',
    q: 'Can abstract class be final?',
    opts: ['Yes', 'No, contradiction', 'Only with interface', 'Depends'],
    ans: 1,
    exp: '🎯 CONTRADICTION: Abstract needs subclass to instantiate. Final prevents subclass. Cannot be both!'
  },
  {
    id: 239, diff: 'medium', cat: 'Abstract',
    q: 'What is template method pattern?',
    opts: ['Creating templates', 'Abstract class defines algorithm skeleton, subclasses fill in steps', 'Interface pattern', 'Factory pattern'],
    ans: 1,
    exp: '🎯 TEMPLATE METHOD: Abstract class defines algorithm structure. Concrete steps are abstract methods implemented by subclasses.'
  },
  {
    id: 240, diff: 'hard', cat: 'Abstract',
    q: 'abstract class A { void m() { n(); } abstract void n(); }\nclass B extends A { void n() { print("B"); } }\nnew B().m() prints?',
    opts: ['Nothing', 'B', 'Error', 'Abstract method called'],
    ans: 1,
    exp: '🎯 TEMPLATE METHOD: m() calls n(). B provides n() implementation. Polymorphism calls B.n(). Prints B.'
  },
  {
    id: 241, diff: 'hard', cat: 'Abstract',
    q: 'abstract class A { abstract void m(); }\nabstract class B extends A { }\nclass C extends B { void m() {} }\nValid?',
    opts: ['Invalid', 'Valid - C implements all abstract methods', 'Only B must implement', 'Warning'],
    ans: 1,
    exp: '🎯 CHAIN: B can be abstract without implementing m(). First concrete class (C) must implement all inherited abstract methods.'
  },
  {
    id: 242, diff: 'medium', cat: 'Abstract',
    q: 'When use abstract class over interface?',
    opts: ['Always', 'When need shared code AND is-a relationship', 'Never', 'For constants'],
    ans: 1,
    exp: '🎯 ABSTRACT CLASS: Use when you need shared implementation code AND there\'s is-a relationship. Interface for capability only.'
  },
  {
    id: 243, diff: 'hard', cat: 'Abstract',
    q: 'interface I { void m(); }\nabstract class A implements I { }\nclass B extends A { }\nCompiles?',
    opts: ['Yes', 'No, B must implement m()', 'No, A must implement m()', 'Warning'],
    ans: 1,
    exp: '🎯 FIRST CONCRETE: A can skip implementing m() (abstract). B is first concrete class, MUST implement m(). Compilation error!'
  },
  {
    id: 244, diff: 'hard', cat: 'Abstract',
    q: 'Can abstract class have main() method?',
    opts: ['No', 'Yes, can run the abstract class', 'Only static main', 'Only with args'],
    ans: 1,
    exp: '🎯 CAN HAVE MAIN: main() is static. Can run: java AbstractClass. main() runs, but cannot create instance of the abstract class.'
  },
  {
    id: 245, diff: 'hard', cat: 'Abstract',
    q: 'Abstract class A { static void test() { new A(); } }\nCompiles?',
    opts: ['Yes', 'No, cannot instantiate abstract class', 'Yes, static context different', 'Warning only'],
    ans: 1,
    exp: '🎯 CANNOT INSTANTIATE: new A() in ANY context fails for abstract class. Compilation error!'
  },
  {
    id: 246, diff: 'hard', cat: 'Abstract',
    q: 'new AbstractList<String>() { public String get(int i) { return ""; } public int size() { return 0; } };',
    opts: ['Invalid', 'Valid - anonymous class implementing abstract class', 'Only interfaces', 'Runtime error'],
    ans: 1,
    exp: '🎯 ANONYMOUS CLASS: Can create anonymous class extending abstract class if you provide all abstract method implementations.'
  },
  {
    id: 247, diff: 'medium', cat: 'Abstract',
    q: 'Can abstract class extend concrete class?',
    opts: ['No', 'Yes', 'Only if concrete is final', 'Only in same package'],
    ans: 1,
    exp: '🎯 VALID: Abstract class can extend concrete class. Might add abstract methods. Less common but allowed.'
  },
  {
    id: 248, diff: 'hard', cat: 'Abstract',
    q: 'class A { void m() {} }\nabstract class B extends A { abstract void m(); }',
    opts: ['Invalid', 'Valid - makes inherited concrete method abstract', 'Only with override', 'Warning'],
    ans: 1,
    exp: '🎯 RE-ABSTRACT: Subclass can make inherited concrete method abstract! Forces sub-subclasses to re-implement.'
  },
  {
    id: 249, diff: 'hard', cat: 'Abstract',
    q: 'Can abstract class have static abstract method?',
    opts: ['Yes', 'No, static cannot be abstract', 'Only public static', 'Depends'],
    ans: 1,
    exp: '🎯 NO STATIC ABSTRACT: Static methods cannot be overridden (only hidden). Abstract requires override → contradiction!'
  },
  {
    id: 250, diff: 'hard', cat: 'Abstract',
    q: 'abstract class A { int x; A(int x) { this.x = x; } }\nclass B extends A { B() { } }\nCompiles?',
    opts: ['Yes', 'No, B must call super(int)', 'Yes, default constructor works', 'Warning only'],
    ans: 1,
    exp: '🎯 CONSTRUCTOR RULE: A has no no-arg constructor. B\'s implicit super() fails. B must explicitly call super(int). Compilation error!'
  }
];
