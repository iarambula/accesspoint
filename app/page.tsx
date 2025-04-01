import {
  Container,
  Card,
  Text,
  Pill,
  Group,
  Title,
  Anchor,
} from "@mantine/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import Parser from "rss-parser";

export default async function Home() {
  const parser = new Parser();

  const feeds = await Promise.all([
    // parser.parseURL("https://peprofessional.com/feed/"),
    parser.parseURL("https://www.privateequitywire.co.uk/feed/"),
  ]);

  return (
    <Container>
      <Title order={1} mb="md">
        Your feed
      </Title>
      {feeds[0].items.map((item) => (
        <Card key={item.guid} shadow="sm" padding="lg" mb="md" withBorder>
          <Anchor href={item.link} size="lg" fw="bold" mb="xs" target="_blank">
            {item.title}
          </Anchor>
          <Group mb="xs">
            {item.isoDate && (
              <Text size="sm" c="dimmed">
                {formatDistanceToNow(parseISO(item.isoDate))}
              </Text>
            )}
            {item.categories && (
              <Text size="sm">
                {item.categories.map((category) => (
                  <Pill key={category} mr="xs">
                    {category}
                  </Pill>
                ))}
              </Text>
            )}
          </Group>
          {item.contentSnippet && (
            <Text size="xs" mb="xs">
              {item.contentSnippet}
            </Text>
          )}
          <Card withBorder>
            <Text>
              <Text
                variant="gradient"
                fw="bold"
                gradient={{ from: "blue", to: "green" }}
              >
                AccessPoint Intelligence
              </Text>
              <Text size="xs" c="dimmed">
                Related to your preferences
              </Text>
              <Anchor>Leveraged Buyout of ABC Corp</Anchor>
              <Group>
                <Anchor>XYZ Capital</Anchor>
                <Anchor>ABC Corp</Anchor>
                <Anchor>Goldman Sachs</Anchor>
                <Anchor>Blackstone</Anchor>
              </Group>
            </Text>
          </Card>
        </Card>
      ))}
    </Container>
  );
}
