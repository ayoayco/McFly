import consola from "consola";
import { vi } from "vitest";
import { expect } from "vitest";
import { test } from "vitest";
import { exportedForTest } from "../commands/build.mjs";

test('start build', () => {
    const spy = vi.spyOn(consola, 'start');

    exportedForTest.build();

    expect(spy).toHaveBeenCalled();
})

/**
 * TODO: add tests for
 * - nitropack build exec
 * - error catch
 */