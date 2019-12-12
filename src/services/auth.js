import store from "../store/index";

/**
 * Resets state and calls logout mutation
 */
function resetState() {
    store.commit("LOGOUT");
    store.commit("SET_LOGGED_USER", {});
    store.commit("RESET_ALL");
    return true;
}

/**
 * retrieves the current user session from state
 */
export function getSession() {
    return store.getters.getLoggedUser;
}

/**
 * Checks for loggedIn status
 * @returns {Boolean} loggedIn state
 */
export function isLoggedIn() {
    return store.getters.isLoggedIn;
}

/**
 * Auth guard allows authenticated users only.
 * @param to - next route
 * @param from - previous route
 * @param next - callback to transfer control to the next middleware
 */
export function requireAuth(to, from, next) {
    if (isLoggedIn() && Object.keys(getSession()).length > 0) {
        next();
    } else {
        resetState();
        next({ name: "login" });
    }
}

/**
 * clears the current session
 */
export function clearSession(to, from, next) {
    resetState();
    next({ name: "login" });
}
