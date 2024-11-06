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

function stream_to_list(s) {
    // for infinite streams, use eval_stream(s, n)
    return is_null(s)
        ? null
        : pair(head(s), stream_to_list(stream_tail(s)));
}

const my_list = list(0, 1, 2, 2, 3, 4);
stream_to_list(list_to_stream(my_list));


