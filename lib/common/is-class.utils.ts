export const isClass = (func: unknown) => {
    return (
        typeof func === 'function' &&
        /^class\s/.test(Function.prototype.toString.call(func))
    );
};
