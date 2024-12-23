import { createSignal, createResource } from "solid-js";

// https://developers.cloudflare.com/workers/frameworks/framework-guides/solid/

const fetchUser = async (id) => (await fetch(`/api/users/${id}`)).json();

export default function Index() {
  /**
   * cannot set a default to anything, not number, not string
   * the compiler throws an error.
   * Error
    The value [object Function] of type "function" cannot be parsed/serialized.


    HOWEVER with HMR, the default value can be set. 
   */
  const [userId, setUserId] = createSignal(/** cannot set a default value here unless it's hot module reload */);
  const [user] = createResource(userId, fetchUser);

  return (
    <>
      <button class="increment" onClick={() => {
        const id = userId() ?? 1;
        setUserId(id + 1)}
        } type="button">
        Clicks: {userId()}
      </button>

      {/* loading does not show, instead it's flashing the whole application. */}
      <span>{user.loading && "Loading..."}</span>
      <Switch>
        <Match when={user.error}>
          <span>Error: {user.error}</span>
        </Match>
        <Match when={user()}>
          <div>{JSON.stringify(user())}</div>
        </Match>
      </Switch>
    </>
  );
};
