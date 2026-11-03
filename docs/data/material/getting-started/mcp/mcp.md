# Model Context Protocol (MCP) for MUI

<p class="description">Access the official Material UI docs and code examples in your AI client.</p>

## What is MCP?

The Model Context Protocol (MCP) is an open standard for connecting AI assistants to real, trusted sources of documentation and code.
For Material UI users, this means you get answers that are accurate, up-to-date, and directly reference the official docs.

To learn more about MCP, see the [official documentation](https://modelcontextprotocol.io/docs/getting-started/intro).

## Why use MCP?

Popular AI coding assistants are excellent at providing answers, especially to straightforward questions.
But when faced with deeper, more complex questions that require understanding concepts from multiple parts of the documentation, they often hallucinate links, cite non-existent documentation, or provide answers that are hard to verify.
MCP solves these problems by:

- Quoting real, direct sources in answers
- Linking to actual documentation—no imaginary links that lead to 404s
- Using component code from officially published registries

## Installation and setup

The sections below detail how to set up the Material UI MCP in popular agentic coding environments.

### VS Code, Cursor, Windsurf

Open the MCP configuration (**Settings** -> **MCP** -> **Add Server**) and add the following:

```json
"mcpServers": {
  "mui-mcp": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@mui/mcp@latest"]
  }
}
```

VS Code users must also enable Agent mode (for Copilot Chat) and add the following to `settings.json`:

```json
  "chat.mcp.enabled": true,
  "chat.mcp.discovery.enabled": true
```

### JetBrains IDEs

Open the MCP configuration (**Settings** -> **Tools** -> **AI Assistant** -> **Model Context Protocol (MCP)**) and add the following:

- Name: MUI MCP
- Command: `npx`
- Arguments: `-y @mui/mcp@latest`

Click **OK** and **Apply**.

### Zed

You can add the Material UI MCP server to Zed as an extension or as a custom server:

#### As an extension

Go to the Extensions page through the keybinding `cmd-shift-x`/`ctrl-shift-x` (macOS/Linux), or via the Command Palette by searching for `zed: extensions`.

Search for "MUI MCP" and install the extension.
No additional configuration is required, but you can optionally add the `preferred_theme` and `component_filter` fields.

#### As a custom server

Search for `agent: add context server` in the Command Palette and add the following:

```json
{
  "mui-mcp-server": {
    "command": {
      "path": "npx",
      "args": ["-y", "@mui/mcp@latest"],
      "env": {}
    }
  }
}
```

### Claude Code

Claude Code is Anthropic's agentic coding tool that runs in your terminal.

You can add the Material UI MCP server to Claude Code via the command line:

```bash
claude mcp add mui-mcp -- npx -y @mui/mcp@latest
```

By default, this installs the MCP server to local-scope of the project you are working on.

If you want the MCP server to always be available to all projects on your machine, you would install it to user-scope:

```bash
claude mcp add mui-mcp -s user -- npx -y @mui/mcp@latest
```

To better understand MCP server scope hierarchy and precedence in Claude Code, see their [official documentation](https://code.claude.com/docs/en/mcp#mcp-installation-scopes).

## Common issues

### I've installed the MCP but there are errors in connection

Try using the MCP inspector to debug the connection.
To do so, run:

```bash
 npx @modelcontextprotocol/inspector
```

Wait for the terminal to print "🔍 MCP Inspector is up and running at http://127.0.0.1:6274".
Navigate to this URL in your browser and set the following parameters:

- **Transport type: Stdio**
- **Command:**`npx`
- **Arguments:** `-y @mui/mcp@latest`

Click **Connect** and wait for the connection to be established.

Once connected, you'll see a list of available tools.
If you're not able to connect, check the logs in the terminal where you ran the MCP inspector for more details.

### I've installed the MCP but it's not being used when I ask questions

If you've installed the MCP and enabled all the necessary settings but it's not being used when you ask questions, you might need to supply rules to your AI client to tell it to use the MCP.

Most editors allow you to specify rules for AI assistants to follow.
In VS Code, for instance, you can create a new rule at `.github/instructions/mui.md` and add the following:

```text
## Use the mui-mcp server to answer any MUI questions --

- 1. call the "useMuiDocs" tool to fetch the docs of the package relevant in the question
- 2. call the "fetchDocs" tool to fetch any additional docs if needed using ONLY the URLs present in the returned content.
- 3. repeat steps 1-2 until you have fetched all relevant docs for the given question
- 4. use the fetched content to answer the question
```

:::info
You can use this same text as a rule for any other IDE, but the preferred location for rules may differ.
:::

## Troubleshooting

The MCP is available as a separate package that runs locally and communicates via your AI client using the `stdio` transport.
Use the following command to test the MCP in the [MCP inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
npx -y @mui/mcp@latest
```
