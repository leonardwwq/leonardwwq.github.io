(function () {
  const suggestionLabels = {
    'bid-ios': '品牌词-IOS · 出价调整至 CPT ¥5.5',
    'bid-general': '品牌词-通用 · 出价调整至 CPT ¥4.6',
    'audience-general': '品牌词-通用 · 受众调整为 18–34 岁 · 游戏兴趣',
  };

  const tree = document.getElementById('account-tree');
  const workspace = document.getElementById('workspace');
  const feedback = document.getElementById('feedback');
  const thinkingBlock = document.getElementById('thinking-block');
  const thinkingToggle = document.getElementById('thinking-toggle');
  const btnAdopt = document.getElementById('btn-adopt');
  const btnDismiss = document.getElementById('btn-dismiss');
  const btnSend = document.getElementById('btn-send');
  const agentInput = document.getElementById('agent-input');

  function selectNode(nodeId) {
    document.querySelectorAll('.tree-row[data-node]').forEach((row) => {
      row.classList.toggle('is-selected', row.dataset.node === nodeId);
    });

    const panes = document.querySelectorAll('.workspace-pane');
    const hasPane = document.querySelector('.workspace-pane[data-pane="' + nodeId + '"]');
    panes.forEach((pane) => {
      pane.classList.toggle('is-active', hasPane ? pane.dataset.pane === nodeId : pane.dataset.pane === 'campaign-1');
    });
  }

  function syncSuggestionItem(label) {
    const checkbox = label.querySelector('input[type="checkbox"]');
    label.classList.toggle('is-checked', checkbox.checked);
  }

  if (tree) {
    tree.addEventListener('click', (event) => {
      const toggle = event.target.closest('.tree-toggle:not(.is-hidden)');
      if (toggle) {
        event.stopPropagation();
        const children = toggle.closest('.tree-node')?.querySelector(':scope > .tree-children');
        if (!children) return;
        const collapsed = children.classList.toggle('is-collapsed');
        toggle.textContent = collapsed ? '▶' : '▼';
        return;
      }

      const row = event.target.closest('.tree-row[data-node]');
      if (!row) return;
      selectNode(row.dataset.node);
    });
  }

  document.querySelectorAll('.suggestion-item').forEach((label) => {
    label.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT') return;
      const checkbox = label.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      syncSuggestionItem(label);
    });

    const checkbox = label.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => syncSuggestionItem(label));
  });

  if (thinkingToggle && thinkingBlock) {
    thinkingToggle.addEventListener('click', () => {
      thinkingBlock.classList.toggle('is-collapsed');
    });
  }

  function showFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = 'feedback is-visible' + (type === 'dismiss' ? ' is-dismiss' : '');
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (btnAdopt) {
    btnAdopt.addEventListener('click', () => {
      const checked = Array.from(document.querySelectorAll('input[name="suggestion"]:checked'));
      if (checked.length === 0) {
        showFeedback('请至少勾选一项建议后再采纳。', 'dismiss');
        return;
      }

      const items = checked.map((input) => suggestionLabels[input.value] || input.value);
      showFeedback(
        '已采纳 ' +
          checked.length +
          ' 项调整：' +
          items.join('；') +
          '。预计 6–12h 内系列 CPA 回落至 ¥34–38，已加入监测。',
      );
    });
  }

  if (btnDismiss) {
    btnDismiss.addEventListener('click', () => {
      showFeedback('已忽略本次预警，24h 内不会再次提醒该规则。', 'dismiss');
    });
  }

  if (btnSend && agentInput) {
    btnSend.addEventListener('click', () => {
      const text = agentInput.value.trim();
      if (!text) return;
      showFeedback('演示模式：已收到你的问题「' + text + '」。完整对话能力将在后续版本开放。', 'dismiss');
      agentInput.value = '';
    });
  }

  document.querySelectorAll('.role-tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.role-tag').forEach((t) => t.classList.remove('is-active'));
      tag.classList.add('is-active');
    });
  });

  selectNode('campaign-1');
})();
