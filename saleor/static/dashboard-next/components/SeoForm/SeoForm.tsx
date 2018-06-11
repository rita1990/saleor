import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as React from "react";

import i18n from "../../i18n";
import FormSpacer from "../FormSpacer";
import PageHeader from "../PageHeader";
import Skeleton from "../Skeleton";

interface SeoFormProps {
  description: string;
  descriptionPlaceholder: string;
  disabled?: boolean;
  loading?: boolean;
  title: string;
  titlePlaceholder: string;
  storefrontUrl?(slug: string): string;
  onChange(event: any);
  onClick();
}

const decorate = withStyles(theme => ({
  addressBar: {
    color: "#006621",
    fontSize: "13px",
    lineHeight: "16px",
    marginBottom: "2px",
    overflow: "hidden" as "hidden",
    textOverflow: "ellipsis" as "ellipsis",
    whiteSpace: "nowrap" as "nowrap"
  },
  container: {
    width: "100%"
  },
  descriptionBar: {
    color: "#545454",
    fontSize: "13px",
    lineHeight: "18px",
    overflowWrap: "break-word" as "break-word"
  },
  preview: {
    minHeight: theme.spacing.unit * 10
  },
  title: {
    padding: 0
  },
  titleBar: {
    color: "#1a0dab",
    fontSize: "18px",
    lineHeight: "21px",
    overflowWrap: "break-word" as "break-word",
    textDecoration: "none",
    wordWrap: "break-word" as "break-word"
  }
}));
const SeoForm = decorate<SeoFormProps>(
  ({
    classes,
    description,
    descriptionPlaceholder,
    disabled,
    loading,
    storefrontUrl,
    title,
    titlePlaceholder,
    onChange,
    onClick
  }) => (
    <Card>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.title}
        >
          <PageHeader title={i18n.t("Search Engine Preview")} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.container}>
            <div className={classes.preview}>
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {!!storefrontUrl &&
                    (title || titlePlaceholder) &&
                    (description || descriptionPlaceholder) && (
                      <>
                        <Typography
                          className={classes.titleBar}
                          onClick={onClick}
                          style={!!onClick ? { cursor: "pointer" } : {}}
                        >
                          {(title || titlePlaceholder).substr(0, 70)}
                        </Typography>
                        <Typography className={classes.addressBar}>
                          {storefrontUrl(title || titlePlaceholder)}
                        </Typography>
                        <Typography className={classes.descriptionBar}>
                          {(description || descriptionPlaceholder).substr(
                            0,
                            300
                          )}
                        </Typography>
                      </>
                    )}
                </>
              )}
            </div>
            <FormSpacer />
            <TextField
              name="seoTitle"
              label={i18n.t("Search engine title")}
              helperText={i18n.t(
                "If empty, the preview shows what will be autogenerated."
              )}
              value={title.slice(0, 70)}
              disabled={loading}
              onChange={onChange}
              fullWidth
            />
            <FormSpacer />
            <TextField
              name="seoDescription"
              label={i18n.t("Search engine description")}
              helperText={i18n.t(
                "If empty, the preview shows what will be autogenerated."
              )}
              value={description.slice(0, 300)}
              onChange={onChange}
              disabled={loading}
              fullWidth
              multiline
              rows={10}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  )
);
export default SeoForm;
