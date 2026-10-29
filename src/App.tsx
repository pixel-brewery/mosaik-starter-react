import { Button } from '@pixel-brewery/mosaik-elements-react/components/button';
import { Icon } from '@pixel-brewery/mosaik-elements-react/components/icon';
import { Pulse } from '@pixel-brewery/mosaik-elements-react/components/pulse';
import { Stack } from '@pixel-brewery/mosaik-elements-react/components/stack';
import { Text } from '@pixel-brewery/mosaik-elements-react/components/text';
import { useState } from 'react';

/**
 * A complete Mosaik composition with state owned by React.
 *
 * @public
 */
export function App() {
    const [clicks, setClicks] = useState(0);
    const counter = `${clicks} ${clicks === 1 ? 'click' : 'clicks'}`;

    return (
        <main>
            <Stack className="starter" orientation="vertical" fit="width">
                <Stack className="starter__container" orientation="vertical" fit="width">
                    <Stack className="starter__card" orientation="vertical" fit="width">
                        <Stack className="starter__header" orientation="horizontal" verticalAlignment="top">
                            <Stack className="starter__intro" orientation="vertical">
                                <Text className="starter__title" text="Mosaik starter" />
                                <Text className="starter__description" text="A small starting point for your next web app." wrap />
                            </Stack>
                        </Stack>
                        <Stack
                            className="starter__content"
                            orientation="vertical"
                            horizontalAlignment="center"
                            verticalAlignment="center"
                            fit="width"
                        >
                            <Pulse className="starter__pulse" count={2} duration="3.6s" variant="neutral">
                                <Icon className="starter__icon" icon="sparkles" />
                            </Pulse>
                            <Stack className="starter__message" orientation="vertical" horizontalAlignment="center">
                                <Text
                                    className="starter__counter"
                                    data-testid="counter"
                                    role="status"
                                    aria-live="polite"
                                    text={counter}
                                    wrap
                                    alignment="center"
                                />
                                <Text
                                    className="starter__hint"
                                    text="This counter is local to your app."
                                    wrap
                                    alignment="center"
                                />
                            </Stack>
                            <Button
                                className="starter__action"
                                data-testid="increment"
                                label="Add a click"
                                variant="primary"
                                appearance="solid"
                                size="small"
                                icon="plus"
                                iconSize="small"
                                onClick={() => setClicks((current) => current + 1)}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </main>
    );
}
