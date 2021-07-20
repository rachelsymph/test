import { AnyAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext, useContext } from 'react';

export const AbilityContext = createContext({} as AnyAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAbilityContext = () => useContext<AnyAbility>(AbilityContext);
