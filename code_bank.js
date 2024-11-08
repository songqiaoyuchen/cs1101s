// Object Conversion

// list -> array
function list_to_array(ls) {
    let output = [];
    const len = length(ls);
    
    for (let i = 0; i < len; i = i + 1) {
        output[array_length(output)] = head(ls);
        ls = tail(ls);
    }
    
    return output;
}

function list_to_array_2(ls) {
    let output = [];
    let i = 0;
    
    map(x => {output[i] = x;
              i = i + 1;}, 
        ls);
             
    return output;
}

// array -> list
function array_to_list(a) {
    let output = null;
    
    for (let i = array_length(a) - 1; i >= 0; i = i - 1) {
        output = pair(a[i], output);
    }
    
    return output;
}

function array_to_list_2(a) {
    function helper(a, i) {
        return i === array_length(a)
            ? null 
            : pair(a[i], helper(a, i + 1));
    }
    
    return helper(a, 0);
}

// list -> stream
function list_to_stream(ls) {
    return is_null(ls)
        ? null 
        : pair(head(ls), () => list_to_stream(tail(ls)));
}

// stream -> list
function stream_to_list(s) {
    // for infinite streams, use eval_stream(s, n)
    return is_null(s)
        ? null
        : pair(head(s), stream_to_list(stream_tail(s)));
}

// array -> stream
function array_to_stream(a) {
    // eval_stream error if n > stream_length
    function helper(a, i) {
        return a[i] === undefined
            ? null 
            : pair(a[i], () => helper(a, i + 1));
    }
    
    return helper(a, 0);
}

// stream -> array
function stream_to_array(s) {
    const output = [];

    while (!is_null(s)) {
        output[array_length(output)] = head(s);
        s = stream_tail(s);
    }
    
    return output;
}



// List Processing

function remove_duplicates(xs) {
    // returns list of unique elements in
    return accumulate((x, ys) => pair(x, filter(y => !equal(x, y), ys)), null, xs);
}

function subset(xs) {
    // returns powerset of xs 
    function add(xs, lst) {
        return map(x => append(x, list(head(xs))), lst);
    }
    function helper(xs, lst) {
        if (is_null(xs)) {
            return lst;
        } else {
            return helper(tail(xs), append(add(xs, lst), lst));
        }
    }
    return helper(xs, list(null));
}

function permutations(xs) {
    // return a list of all permutations of xs
    function insert(index, xs, element) {
        return index === 0
            ? append(element, xs)
            : insert(index - 1, tail(xs), pair(head(xs), element));
    }
    function insert_all(n, lst, element) {
        return n < 0
            ? null
            : pair(insert(n, lst, list(element)), insert_all(n - 1, lst, element));
    }
    function main(xs, lst) {
        return is_null(xs)
            ? lst
            : main(tail(xs), accumulate(append, null, (map(x => insert_all(length(x), x,
                            head(xs)), lst))));
    }
    return main(xs, list(null));
}



// Array Processing

function array_slice(a, start, end) {
    // create new array from a[start] to a[end]
    const output = [];
    
    for (let i = start; i <= end; i = i + 1) {
        if (i >= array_length(a)) {
            return "error: index out of range";
            break;
        } else {
            output[array_length(output)] = a[i];
        }
    }
    
    return output;
}

function insert_to_array(item, a, i) {
    // insert item at a[i] and shifts items in a accordingly
    for (let j = array_length(a) - 1; j >= 0; j = j - 1) {
        if (j >= i) {
            a[j + 1] = a[j];
        }
    }
    a[i] = item;
    
    return a;
}

function remove_array_index(a, i) {
    // remove array item at index i
    if (i >= array_length(a)) {
        return "error: index out of range.";
    }
    
    const output = [];
    
    for(let j = 0; j < array_length(a) - 1; j = j + 1) {
        if (j < i) {
            output[j] = a[j];
        } else {
            output[j] = a[j + 1];
        }
    }
    
    return output;
}

function remove_array_item(a, item) {
    // remove first item in array that === item
    for(let i = 0; i < array_length(a); i = i + 1) {
        if (a[i] === item) {
           return remove_array_index(a, i);
        }
    }
    
    return a; // if item not found, return original array
}

function append_array(a1, a2) {
    // join two arrays together
    for (let i = 0; i < array_length(a2); i = i + 1) {
        a1[array_length(a1)] = a2[i];
    }
    
    return a1;
}

function map_array(f, a) {
    for (let i = 0; i < array_length(a); i = i + 1) {
        a[i] = f(a[i]);
    }
    
    return a;
}

function accumulate_array(f, initial, a) {
    for (let i = 0; i < array_length(a); i = i + 1) {
        initial = f(a[i], initial);
    }
    
    return initial;
}



// Tree Processing

function map_tree(f, tree) {
    // for tree of numbers
    return map(x => { if (is_number(x)) {
                        return f(x);
                      } else {
                        return map_tree(f, x);
                      }
                    }, tree);
}

function tree_to_array(tree) {
    if (is_null(tree)) {
        return null;
    } else if (is_number(tree)) {
      return tree;  
    } else {
        let temp = [];
        for (let i = 0; i < length(tree); i = i + 1) {
            temp[i] = tree_to_array(list_ref(tree, i));
        }
        return temp;
    }
}



// Sorting Algorithms

// Selection Sort
function selection_sort_list(ls) {
    function smallest(ls) {
        return is_null(ls)
            ? null 
            : is_null(tail(ls))
            ? head(ls)
            : head(ls) > smallest(tail(ls))
            ? smallest(tail(ls))
            : head(ls);
    }
    
    if (is_null(ls)) {
        return null;
    } else {
        const x = smallest(ls);
        return pair(x, selection_sort_list(remove(x, ls)));
    }
}

function selection_sort_array(a) {
    function smallest(a) {
        let output = a[0];
        
        for (let i = 1; i < array_length(a); i = i + 1) {
            if (a[i] < output) {
                output = a[i];
            }
        }

        return output;
    }
    
    const output = [];
    let temp = a;
    for (let i = 0; i < array_length(a); i = i + 1) {
        const x = smallest(temp);
        output[i] = x;
        temp = remove_array_item(temp, x);
    }
    
    return output;
}

// Insertion Sort
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

// Bubble Sort
function bubblesort_list(L) {
    function swap(xs) {
        if (is_null(xs) || is_null(tail(xs))) {
            return false;
        }
        let first = head(xs);
        let second = head(tail(xs));
        
        if (first > second) {
            set_head(xs, second);
            set_head(tail(xs), first);
            return true;
        }
        return swap(tail(xs));
    }
    while (swap(L)) {}
}

// Merge Sort
function merge_sort(xs) {
    function merge(xs, ys) {
        if (is_null(xs)) {
            return ys;
        } else if (is_null(ys)) {
            return xs;
        } else {
            return head(xs) < head(ys)
                ? pair(head(xs), merge(tail(xs), ys))
                : pair(head(ys), merge(xs, tail(ys)));
        }
    }
    function take(xs, n) {
        return n === 0
            ? null
            : pair(head(xs), take(tail(xs), n - 1));
    }
    function drop(xs, n) {
        return n === 0
            ? xs
            : drop(tail(xs), n - 1);
    }
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = math_floor(length(xs) / 2);
        return merge(merge_sort(take(xs, mid)),
                merge_sort(drop(xs, mid)));
    }
}