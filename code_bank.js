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


