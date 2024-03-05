import { User } from "@supabase/supabase-js";
import { atomWithStorage } from "jotai/utils";

export const spsIskraAuthAtom = atomWithStorage<User | null>('authToken', null);