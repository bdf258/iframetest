import { createUseStyles } from "react-jss";
import { useState } from "react";

const useStyles = createUseStyles({
  fade: {
    transition: ({ duration }) => `opacity ${duration}ms`,
    opacity: ({ opacity }) => opacity,
  },
});

/*
 * Usage:
 * 1. Destructure toggleFade and fadeClass from useFadeOut hook
 *    const {toggleFade, fadeClass} = useFadeout();
 *
 * 2. Pass fadeClass to component(s) which need to fade
 *    <div className={fadeClass} >...</div>
 *
 * 3. Call toggleFade() function to trigger fade
 *    <Button onClick={() => {
 *       ...
 *       toggleFade()
 *    }}>
 *        ...
 *    </Button>
 *
 * 4. (optional) toggleFade accepts function which is called once
 *    component begins to fade back in. Useful if action would remove
 *    component from view due to state changes, preventing fade out effect
 */

const useFadeOut = (duration = 1000) => {
  const [fade, setFade] = useState(false);
  const classes = useStyles({ opacity: fade ? 0 : 1, duration });

  const toggleFade = (postFade) => {
    setFade(true);
    !fade &&
      setTimeout(() => {
        setFade(false);
        postFade && postFade();
      }, duration);
  };

  return { toggleFade, fadeClass: classes.fade };
};

export default useFadeOut;
