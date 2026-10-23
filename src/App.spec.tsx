import type { TextElement } from '@pixel-brewery/mosaik-elements-foundation';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { initializeMosaik } from './mosaik';

// jsdom omits browser constructors used by the component package's event metadata.
vi.hoisted(() => {
    for (const name of ['ClipboardEvent', 'DragEvent', 'PointerEvent']) {
        if (!(name in globalThis)) {
            Object.defineProperty(globalThis, name, { value: MouseEvent, configurable: true });
        }
    }
});

let root: Root | undefined;

beforeAll(() => {
    Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });
    initializeMosaik();
});

afterEach(async () => {
    await act(() => root?.unmount());
    root = undefined;
    document.body.replaceChildren();
});

describe('App', () => {
    it('updates the displayed count for consecutive button activations', async () => {
        const host = document.createElement('div');
        document.body.append(host);
        root = createRoot(host);
        await act(() => root?.render(<App />));

        const counter = host.querySelector<TextElement>('[data-testid="counter"]');
        const increment = host.querySelector<HTMLElement>('[data-testid="increment"]');
        if (!counter || !increment) {
            throw new Error('The counter controls did not render.');
        }

        expect(counter.text).toBe('0 clicks');

        await act(() => increment.click());
        expect(counter.text).toBe('1 click');

        await act(() => increment.click());
        expect(counter.text).toBe('2 clicks');
    });
});
